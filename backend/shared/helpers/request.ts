import { SessionDto } from "@/backend/session/dtos/session.dto";
import { getSession } from "@/backend/session/helpers/get-session.helper";
import { refreshToken } from "./refresh-token";

let refreshPromise: Promise<void> | null = null;

export async function request(
  endpoint: string,
  init?: RequestInit & { isFile?: boolean; useAuth?: boolean },
): Promise<Response> {
  let response = await makeRequest(endpoint, { ...init, useAuth: init?.useAuth ?? true });

  if (response.status === 401) {
    if (!refreshPromise) {
      refreshPromise = refreshToken()
        .finally(() => {
          refreshPromise = null;
        });
    }

    await refreshPromise;

    response = await makeRequest(endpoint, { ...init, useAuth: init?.useAuth ?? true });
  }

  return response;
}

async function makeRequest(
  endpoint: string,
  init?: RequestInit & { isFile?: boolean; useAuth?: boolean },
): Promise<Response> {
  const token = await getSession<SessionDto>();

  const headers: HeadersInit = {
    Authorization: `Bearer ${token?.access_token}`,
  };

  if(!init?.useAuth) {
    delete headers.Authorization;
  }

  if (!init?.isFile) {
    headers["Content-Type"] = "application/json";
  }

  const apiUrl = process.env.API_URL || process.env.NEXT_PUBLIC_API_URL;
  const response = await fetch(`${apiUrl}${endpoint}`, {
    ...init,
    headers: headers,
  });

  return response;
}
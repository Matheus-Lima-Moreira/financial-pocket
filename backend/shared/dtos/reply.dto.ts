import { StatusCode } from "../enum/status-code";
import { InvalidFieldDto } from "./invalid-field.dto";
import { PaginationDto } from "./pagination.dto";

export type ReplyDto<T = void> = {
  code: StatusCode;
  message?: string;
  pagination?: PaginationDto;
  data: T;
  errors?: InvalidFieldDto[];
};
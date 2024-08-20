// @ts-nocheck
import type { NextFunction, Request, Response } from "express"
import { HttpError, NotFoundError } from "../errors.js"

export const errorHandler = (
	err: HttpError | Error,
	_req: Request,
	res: Response,
	_next: NextFunction,
): void => {
	const status = 'status' in err ? err.status : 500;
	const message = err.message || 'Internal Server Error';

	res.status(status).json({
		error: {
			status,
			message,
		},
	});
};

export const errorNotFoundHandler = (
	_req: Request,
	_res: Response,
	next: NextFunction,
): void => {
	next(new NotFoundError("Not Found"))
}

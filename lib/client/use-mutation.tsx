import { useState } from "react";
import { getCookie } from "cookies-next";

export interface OnlyOkResponse {
	ok: boolean;
}

interface UseMutationState<T> {
	loading: boolean;
	data?: T;
	error?: object;
}
type UseMutationResult<T> = [(data: any) => void, UseMutationState<T>];

// useMutation이라는 훅을 선언한다.
// 이 훅은 URL을 인자로 받아서 UseMutationResult를 반환한다.
export default function useMutation<T = any>(
	url: string,
	withAuth?: boolean,
	method: "POST" | "PUT" = "POST",
): UseMutationResult<T> {
	const [state, setState] = useState<UseMutationState<T>>({
		loading: false,
		data: undefined,
		error: undefined,
	});

	function mutation(data: any) {
		setState(prev => ({ ...prev, loading: true }));

		// fetch 함수를 이용하여 POST 요청을 보냅니다.
		fetch(url, {
			method: method,
			headers: {
				"Content-Type": "application/json",
				Authorization: withAuth ? `Bearer ${getCookie("accessToken")}` || "" : "",
			},
			body: JSON.stringify(data),
		})
			.then(response => response.json().catch(() => {}))
			// json으로 변환된 데이터를 state의 data로 설정한다.
			.then(data => setState(prev => ({ ...prev, data })))
			// 만약 요청 과정에서 에러가 발생하면, 이를 state의 error로 설정한다.
			.catch(error => setState(prev => ({ ...prev, error })))
			// 요청이 완료되면(성공/실패 여부와 무관하게), loading을 false로 설정한다.
			.finally(() => setState(prev => ({ ...prev, loading: false })));
	}
	return [mutation, { ...state }];
}
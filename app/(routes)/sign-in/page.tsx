"use client";

import Frame from "@/app/_components/frame";
import { Spinner } from "@/app/_components/loading-spinner";
import useMutation from "@/lib/client/use-mutation";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import styled from "styled-components";

interface SignInForm {
    email: string;
    password: string;
}

interface SignInResponse {
    ok: boolean;
}

export default function SignInPage() {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<SignInForm>({ mode: "onChange" });

    const [callSignIn, { loading, data, error }] = useMutation<SignInResponse>("/api/user/sign-in");

    const onValid = (formData: SignInForm) => {
        callSignIn(formData);
        // 로그인 성공 시 메인으로 이동 등 추가 처리 필요
        // router.replace("/");
    };

    return (
        <Frame>
            <Main>
                <FormContainer onSubmit={handleSubmit(onValid)}>
                    <FormHeader>
                        <IconBtn src="/back.png" onClick={() => router.back()} />
                        <IconBtn src="/user.png" />
                    </FormHeader>
                    <FormTitle>Sign in</FormTitle>
                    <Form>
                        {loading && (
                            <SpinnerWrapper>
                                <Spinner size="40px" color="#92BB8F" />
                            </SpinnerWrapper>
                        )}
                        <Input
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                    message: "Invalid email address"
                                }
                            })}
                            type="email"
                            placeholder="Email"
                            autoComplete="username"
                        />
                        {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
                        <Input
                            {...register("password", {
                                required: "Password is required"
                            })}
                            type="password"
                            placeholder="Password"
                            autoComplete="current-password"
                        />
                        {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
                        <LoginBtn type="submit">Login</LoginBtn>
                        <SubText>
                            if you forget ID or PW, <a href="#" style={{ textDecoration: 'underline', color: 'black' }}>click here</a>
                        </SubText>
                        <SSOBtn type="button">SSO login</SSOBtn>
                        <Divider />
                        <BottomText>
                            if you don't have account, <SignUpLink href="/sign-up">sign up here</SignUpLink>
                        </BottomText>
                    </Form>
                </FormContainer>
            </Main>
        </Frame>
    );
}

const Main = styled.main`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    height: 100vh;
    background: none;
`;
const SpinnerWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(255, 255, 255, 0.8);
  z-index: 1000;
`;
const FormContainer = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    width: 320px;
    min-height: 380px;
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 8px 0 rgba(0,0,0,0.08);
    padding: 24px 24px 32px 24px;
    margin: 0 auto;
    position: relative;
`;
const FormHeader = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    margin-bottom: 8px;
`;
const IconBtn = styled.img`
    width: 28px;
    height: 28px;
    cursor: pointer;
    background: none;
    border-radius: 50%;
    padding: 4px;
    object-fit: contain;
`;
const Form = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    gap: 8px;
`;
const Input = styled.input`
    background: #eaeaea;
    border: none;
    border-radius: 6px;
    padding: 12px 8px;
    margin-bottom: 4px;
    width: 100%;
    font-size: 1rem;
    font-weight: 500;
    box-sizing: border-box;
    &::placeholder {
        color: #888;
        font-weight: 500;
    }
    &:focus{
        outline: 2px solid #A3C7A6;
        background: #f5f5f5;
    }
`;
const LoginBtn = styled.button`
    background-color: #92bb8f;
    color: #222;
    border: none;
    border-radius: 10px;
    padding: 12px 0;
    margin-top: 16px;
    width: 100%;
    font-size: 1.1rem;
    font-weight: bold;
    cursor: pointer;
    transition: background 0.2s;
    box-shadow: none;
    &:hover:not(:disabled){
        background-color: #7fa97a;
    }
    &:disabled{
        background-color: #ccc;
        color: #666;
        cursor: not-allowed;
    }
`;const SSOBtn = styled.button`
    background-color: #d6eadf;
    color: #222;
    border: none;
    border-radius: 10px;
    padding: 12px 0;
    margin-top: 8px;
    width: 100%;
    font-size: 1.1rem;
    font-weight: bold;
    cursor: pointer;
    transition: background 0.2s;
    box-shadow: none;
    &:hover:not(:disabled){
        background-color: #c2dbc5;
    }
`;
const FormTitle = styled.div`
  width: 100%;
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 18px;
  margin-top: 2px;
  text-align: left;
  align-self: flex-start;
`;
const ErrorMessage = styled.div`
    color: red;
    font-size: 0.85rem;
    text-align: left;
    align-self: flex-start;
    width: 100%;
    margin-top: -2px;
    margin-bottom: 2px;
`;
const SubText = styled.div`
    width: 100%;
    font-size: 0.95rem;
    margin: 4px 0 0 0;
    text-align: center;
`;
const Divider = styled.hr`
    width: 100%;
    border: none;
    border-top: 1px solid #eaeaea;
    margin: 18px 0 8px 0;
`;
const BottomText = styled.div`
    width: 100%;
    font-size: 0.95rem;
    text-align: center;
    margin-top: 0;
`;
const SignUpLink = styled.a`
    color: black;
    text-decoration: underline;
    cursor: pointer;
`;

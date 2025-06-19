'use client';

import Frame from "../../_components/frame";
import styled from "styled-components"
import { Spinner } from "../../_components/loading-spinner";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import useMutation from "@/lib/client/use-mutation";

interface SignUpForm {
    email: string;
    password: string;
    confirmPassword: string;
}

interface SignUpResponse {
    ok:boolean;
}
  

export default function SignUpPage() {
    const router = useRouter();
    const {
        register,
        handleSubmit, 
        watch,
        formState: {errors}
    } = useForm<SignUpForm>({mode: "onChange"});

    const passwordValue = watch("password");
    // console.log(passwordValue);
    
    const [callSignUp, {loading, data, error}] = useMutation<SignUpResponse>("/api/user/sign-up");

    const onValid = (data: SignUpForm) => {
        callSignUp({email: data.email, password: data.password});
        router.replace("/");
    };

    return(
        <Frame>
            <Main>
                <FormContainer onSubmit={handleSubmit(onValid)}>
                    <Form>
                    {loading && (
                        <SpinnerWrapper>
                        <Spinner size="40px" color="#92BB8F" />
                        </SpinnerWrapper>
                    )}
                        <FormHeader>
                            <IconBtn src="./user.png" onClick={() => router.back()}></IconBtn>
                            
                            <IconBtn src="./back.png" onClick={() => router.replace("/")}></IconBtn>
                        </FormHeader>
                        <FormTitle>Sign up</FormTitle>
                        <Label>Email</Label>
                        
                        <Input
                            {...register("email", 
                                {required: true,
                                    pattern: {
                                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                        message: "Invalid email address"
                                    }
                                }

                            )}
                            type="email"
                            required
                        />
                        {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
                        <Label>Password</Label>
                        <Input
                            {...register("password",{
                                required: true,
                                minLength: {
                                    value: 8,
                                    message: "Password must be at least 8 characters long"
                                },
                                pattern: {
                                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
                                    message: "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
                                }
                            })}
                            type="password"
                            required
                        />
                        {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
                        <Label>Confirm Password</Label>
                        <Input
                            {...register("confirmPassword",{
                                required: true,
                                validate: (value) => value === passwordValue || "Passwords do not match"
                            })}
                            type="password"
                            required
                        />  
                        {errors.confirmPassword && <ErrorMessage>{errors.confirmPassword.message}</ErrorMessage>}
                        <SignUpBtn type="submit">Sign-up</SignUpBtn>
                        <AgreementText>By signing up, you agree to <SLink href="/terms" style={{color: "black", textDecoration: "underline"}}>our Terms of Service and Privacy Policy</SLink>.</AgreementText>
                        <LoginText>Already have an account? <SLink href="/sign-in" style={{color: "black", textDecoration: "underline"}}>Login</SLink></LoginText>
                    </Form>
                    
                </FormContainer>
            </Main>
        </Frame>
    )

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
    padding: 0px 24px 32px 24px;
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

const Label = styled.label`
    font-size: 1rem;
    font-weight: 500;
    text-align: left;
    align-self: flex-start;
    margin-bottom: 2px;

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

const SignUpBtn = styled.button`   
    background-color: #92BB8F;
    color: #fff;
    border: none;
    border-radius: 10px;
    padding: clamp(8px, 1vw, 10px);
    margin-bottom: 10px;
    width: 100%;
    box-sizing: border-box;
    font-size: clamp(0.9rem, 1vw, 1rem);
    cursor: pointer;
    transition: all 0.2s ease;
    
    &:hover:not(:disabled){
        background-color: #7aa876;
    }
    
    &:disabled{
        background-color: #ccc;
        color: #666;
        cursor: not-allowed;
    }
`;

const FormTitle = styled.div`
  width: 100%;
  font-size: clamp(1.8rem, 2.3vw, 2.3rem);
  font-weight: bold;
  margin-bottom: 18px;
  margin-top: 2px;
  text-align: left;
  align-self: left;
  margin-left: 10px;
  padding-top: 20px;
`;

const AgreementText = styled.div`
    font-size: clamp(0.7rem, 0.8vw, 0.8rem);
    color: darkgray;
    text-align: center;
    align-self: center;
    width: 100%;
    padding: 0 15px;
    box-sizing: border-box;
`;

const LoginText = styled.div`
    font-size: clamp(0.7rem, 0.8vw, 0.8rem);
    color: darkgray;
    text-align: center;
    align-self: center;
    width: 100%;
    padding: 0 15px;
    box-sizing: border-box;
`;

const SLink = styled.a`
  text-decoration: none;
  color: inherit;
`;

const ErrorMessage = styled.div`
    color: red;
    font-size: clamp(0.7rem, 0.8vw, 0.8rem);
    text-align: left;
    align-self: left;
    width: 100%;
    margin-top: -5px;
    margin-bottom: 5px;
    padding-left: 10px;
    box-sizing: border-box;
`;
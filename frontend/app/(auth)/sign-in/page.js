"use client";
import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Button from "@/components/ui/Button";
import Link from "next/link";
import Image from "next/image";
import backgroundImage from "@/public/backgroundimage.svg";
import SocialAuthButton from "@/components/ui/SocialAuthButton";
import { useRouter } from "next/navigation";
import { useForm, FormProvider } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Input from "@/components/ui/Input";

const schema = yup.object().shape({
  Email: yup.string().email("Invalid email format").required("Email is required"),
  Password: yup.string().min(8, "Password must be at least 8 characters").required("Password is required"),
});

export default function SignIn() {
  const router = useRouter();
  const { loginWithRedirect, isAuthenticated, isLoading } = useAuth0();

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      Email: "",
      Password: ""
    },
    mode: "onSubmit"
  });

  const { formState: { errors, isSubmitting } } = methods;

  const onSubmit = async (data) => {
    console.log('Form submitted with:', data);
  };

  const handleSocialLogin = async (provider = null) => {
    try {
      await loginWithRedirect({
        authorizationParams: {
          connection: provider,
          scope: 'openid profile email',
          screen_hint: 'login',
        }
      });
    } catch (error) {
      console.error('Error during social login:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-amber-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row justify-evenly">
      <section className="lg:flex-grow relative">
        {/* Mobile view - smaller image */}
        <div className="sm:hidden w-full h-[201px] relative rounded-t-sm overflow-hidden">
          <div className="absolute top-0 bottom-0 left-0 right-0 bg-[#00000085]/50 z-40"></div>
          <Image
            src={backgroundImage || "/placeholder.svg"}
            fill
            alt="Freight container ship illustration"
            className="object-cover z-0"
          />
        </div>

        {/* Tablet view of the image */}
        <div className="hidden sm:block lg:hidden w-full h-[400px] relative rounded-t-sm overflow-hidden">
          <div className="absolute top-0 bottom-0 left-0 right-0 bg-[#00000085]/50 z-40"></div>
          <Image
            src={backgroundImage || "/placeholder.svg"}
            fill
            alt="Freight container ship illustration"
            className="object-cover z-0"
          />
        </div>

        {/* Desktop view of image */}
        <div className="hidden lg:block absolute top-0 bottom-0 left-0 right-0">
          <div className="absolute top-0 bottom-0 left-0 right-0 bg-[#00000085]/50 z-40"></div>
          <Image
            src={backgroundImage || "/placeholder.svg"}
            fill
            alt="Freight container ship illustration"
            className="object-cover z-0"
          />
        </div>
      </section>

      {/* Right section with auth form */}
      <section className="w-[470px] xl:w-[634.2px] flex flex-col items-center py-16 px-8 lg:px-14 xl:px-20">
        <div className="min-h-[547.6px] h-auto w-full space-y-5">
          <div className="space-y-2 mb-5">
            <h1 className="text-[var(--headerText)] font-semibold text-[36px] open_sans">
              Welcome 👋
            </h1>
            <p className="text-gray-600 text-base">
              Every load, every mile. Sign in to streamline your freight and
              logistics management.
            </p>
          </div>

          <FormProvider {...methods}>
            <form
              onSubmit={methods.handleSubmit(onSubmit)}
              className="flex flex-col space-y-4 mt-6"
            >
              <Input
                type="email"
                name="Email"
                label="Email"
                placeholder="Example@email.com"
                required={true}
                ErrorMessage={errors.Email?.message}
              />

              <Input
                type="password"
                name="Password"
                label="Password"
                placeholder="At least 8 characters"
                required={true}
                minLength={8}
                ErrorMessage={errors.Password?.message}
              />

              <div className="flex justify-end">
                <Link href="/forgot-password" className="text-blue-600 text-sm">
                  Forgot Password?
                </Link>
              </div>

              <div className="pt-4">
                <Button
                  type="submit"
                  text={isSubmitting ? "Signing in..." : "Sign in"}
                  className="w-full h-[57px] open_sans rounded-[4.5px] text-[15.6px] bg-amber-600 hover:bg-amber-700"
                  disabled={isSubmitting}
                />
              </div>
            </form>
          </FormProvider>

          {/* Social authentication buttons */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or continue with</span>
            </div>
          </div>

          <div className="space-y-3">
            <SocialAuthButton
              provider="google"
              onClick={() => handleSocialLogin('google-oauth2')}
            />
            <SocialAuthButton
              provider="facebook"
              onClick={() => handleSocialLogin('facebook')}
            />
          </div>

          <p className="flex gap-1 justify-center text-center open-sans text-[15.6px] pt-4">
            Don&apos;t have an account?{" "}
            <Link href="/sign-up" className="text-blue-600">
              Sign up
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
}

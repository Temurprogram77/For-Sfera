import { DB_USER } from "@/_mock/assets_backup";
import type { SignInReq } from "@/api/services/userService";
import { GLOBAL_CONFIG } from "@/global-config";
import { useSignIn } from "@/store/userStore";
import { Button } from "@/ui/button";
import { Checkbox } from "@/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/ui/form";
import { Input } from "@/ui/input";
import { cn } from "@/utils";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import {
  LoginStateEnum,
  useLoginStateContext,
} from "./providers/login-provider";

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">) {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [remember, setRemember] = useState(true);
  const navigate = useNavigate();

  const { loginState, setLoginState } = useLoginStateContext();
  const signIn = useSignIn();
  const form = useForm<SignInReq>({
    defaultValues: {
      phoneNumber: DB_USER[0].phone,
      password: DB_USER[0].password,
    },
  });

  if (loginState !== LoginStateEnum.LOGIN) return null;

  const handleFinish = async (values: SignInReq) => {
    setLoading(true);
    try {
      // 1) DB_USER dan telefon raqami va parol bo‘yicha userni topamiz
      const user = DB_USER.find(
        (u) => u.phone === values.phoneNumber && u.password === values.password
      );

      if (!user) {
        toast.error("Telefon raqami yoki parol noto‘g‘ri!");
        return;
      }
      console.log("User:", user); // shu yerga yozdik
      console.log("Role:", user?.role); // shu yerga yozdik

      // 2) User roli
      const role = user.role;
      localStorage.setItem("role", role);

      // 3) ROLGA KO‘RA NAVIGATSIYA
      // 3) ROLGA KO‘RA NAVIGATSIYA
      switch (role) {
        case "ADMIN":
          console.log("Navigating to /dashboard/admin");
          navigate("/dashboard/admin", { replace: true });
          break;

        case "SUPER-ADMIN":
          console.log("Navigating to /workbench");
          navigate("/workbench", { replace: true });
          break;

        case "TEACHER":
          console.log("Navigating to /dashboard/teacher");
          navigate("/dashboard/teacher", { replace: true });
          break;

        case "PARENT":
          console.log("Navigating to /dashboard/parent");
          navigate("/dashboard/parent", { replace: true });
          break;

        case "USER":
          console.log("Navigating to /dashboard/student");
          navigate("/dashboard/student", { replace: true });
          break;

        default:
          console.log(
            `Navigating to default route: ${GLOBAL_CONFIG.defaultRoute}`
          );
          navigate(GLOBAL_CONFIG.defaultRoute, { replace: true });
      }

      toast.success(t("sys.login.loginSuccessTitle"), {
        closeButton: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)}>
      <Form {...form} {...props}>
        <form onSubmit={form.handleSubmit(handleFinish)} className="space-y-4">
          <div className="flex flex-col items-center gap-2 text-center">
            <h1 className="text-2xl font-bold">
              {t("sys.login.signInFormTitle")}
            </h1>
            <p className="text-balance text-sm text-muted-foreground">
              {t("sys.login.signInFormDescription")}
            </p>
          </div>

          <FormField
            control={form.control}
            name="phoneNumber"
            rules={{ required: "Telefon raqam majburiy" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Telefon raqami</FormLabel>
                <FormControl>
                  <Input
                    placeholder={DB_USER.map((u) => u.phone).join(" / ")}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            rules={{ required: t("sys.login.passwordPlaceholder") }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("sys.login.password")}</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder={DB_USER[0].password}
                    {...field}
                    suppressHydrationWarning
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex flex-row justify-between">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="remember"
                checked={remember}
                onCheckedChange={(checked) =>
                  setRemember(checked === "indeterminate" ? false : checked)
                }
              />
              <label
                htmlFor="remember"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {t("sys.login.rememberMe")}
              </label>
            </div>
            <Button
              variant="link"
              onClick={() => setLoginState(LoginStateEnum.RESET_PASSWORD)}
              size="sm"
            >
              {t("sys.login.forgetPassword")}
            </Button>
          </div>

          <Button type="submit" className="w-full">
            {loading && <Loader2 className="animate-spin mr-2" />}
            {t("sys.login.loginButton")}
          </Button>

          <div className="text-center text-sm">
            {t("sys.login.noAccount")}
            <Button
              variant="link"
              className="px-1"
              onClick={() => setLoginState(LoginStateEnum.REGISTER)}
            >
              {t("sys.login.signUpFormTitle")}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

export default LoginForm;

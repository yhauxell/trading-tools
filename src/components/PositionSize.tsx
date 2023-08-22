import { FC } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

type FormData = {
  accountBalance: number;
  entryPrice: number;
  riskPercentage: number;
  sl: number;
  tp: number;
};

const schema = yup
  .object({
    accountBalance: yup.number().positive().integer().required(),
    entryPrice: yup.number().positive().integer().required(),
    riskPercentage: yup.number().positive().integer().required(),
    sl: yup.number().positive().integer().required(),
    tp: yup.number().positive().integer().required(),
  })
  .required();

export const PositionSize: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: FormData) => console.log(data);

  return (
    <div className="mx-auto w-1/2 mt-96 grid grid-cols-2 grid-flow-row gap-4">
      <Card>
        <CardHeader>Calculate your position size</CardHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent>
            <Input
              placeholder="Account balance"
              type="text"
              {...register("accountBalance", { required: true })}
              aria-invalid={!!errors.accountBalance}
            />
            {errors.accountBalance && (
              <p className="input-error">Account balance is required</p>
            )}
            <Input
              placeholder="Entry price"
              type="text"
              {...register("entryPrice")}
              aria-invalid={!!errors.entryPrice}
            />
            {errors.entryPrice && (
              <p className="input-error">Entry price required</p>
            )}
            <Input
              placeholder="Risk %"
              type="text"
              {...register("riskPercentage")}
              aria-invalid={!!errors.entryPrice}
            />
            <Input
              placeholder="Stop loss price"
              type="text"
              {...register("sl")}
              aria-invalid={!!errors.entryPrice}
            />

            <Input
              placeholder="Take profit price"
              type="text"
              {...register("tp")}
              aria-invalid={!!errors.entryPrice}
            />
          </CardContent>
          <CardFooter>
            <Button variant="default" size="lg">
              Click me
            </Button>
          </CardFooter>
        </form>
      </Card>
      <Card>Hello</Card>
    </div>
  );
};

import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

type FormData = {
  accountBalance: number;
  entryPrice: number;
}

const schema = yup
  .object({
    accountBalance: yup.number().positive().integer().required(),
    entryPrice: yup.number().positive().integer().required(),
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

  const onSubmit = (data: FormData ) => console.log(data);

  return (
    <div className="w-1/2 mx-auto">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          placeholder="Account balance"
          type="text"
          {...register('accountBalance', { required: true })}
          aria-invalid={!!errors.accountBalance}
        />
        {errors.accountBalance && (
          <p className="input-error">Account balance is required</p>
        )}
        <Input
          placeholder="Entry price"
          type="text"
          {...register('entryPrice')}
          aria-invalid={!!errors.entryPrice}
        />
        {errors.entryPrice && (
          <p className="input-error">Entry price required</p>
        )}
        <Button>Click me</Button>
      </form>
    </div>
  );
};

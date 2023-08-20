import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

type FormData = {
  accountBalance: string;
  entryPrice: string;
};

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
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => console.log(data);

  return (
    <div className="w-1/2 mx-auto">
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          className="input-text aria-[invalid]:border-red-400"
          placeholder="Account balance"
          type="text"
          {...register('accountBalance', { required: true })}
          aria-invalid={!!errors.accountBalance}
        />
        {errors.accountBalance && (
          <p className="input-error">Account balance is required</p>
        )}
        <input
          className="input-text  aria-[invalid]:border-red-400"
          placeholder="Entry price"
          type="text"
          {...register('entryPrice')}
          aria-invalid={!!errors.entryPrice}
        />
        {errors.entryPrice && (
          <p className="input-error">Entry price required</p>
        )}
        <button className="button-primary" type="submit">
          Click me
        </button>
      </form>
    </div>
  );
};

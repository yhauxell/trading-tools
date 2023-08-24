import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { MagicWandIcon } from '@radix-ui/react-icons';
import { Label } from './ui/label';

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

interface CalculatedPositionSize {
  distanceToStop: number;
  riskAmount: number;
  size: number;
  requiredCapital: number;
  r3: number;
  withLeverage: number;
}

export const PositionSize: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const [positionSize, setPositionSize] = useState<CalculatedPositionSize>();
  const defaultLeverage = 10;
  const [leverage, setLeverage] = useState<number>(defaultLeverage);

  const onSubmit = ({
    accountBalance,
    entryPrice,
    riskPercentage,
    sl,
    tp,
  }: FormData) => {
    //do the math

    const distanceToStop = entryPrice - sl;
    const distanceToProfit = tp - entryPrice;
    const r3 = 100 / (distanceToStop / distanceToProfit) / 100;
    const riskAmount = accountBalance * (riskPercentage / 100);
    const size = riskAmount / distanceToStop;
    const requiredCapital = entryPrice * size;
    const withLeverage = requiredCapital / leverage;

    setPositionSize({
      distanceToStop,
      riskAmount,
      size,
      requiredCapital,
      r3,
      withLeverage
    });
  };

  return (
    <div className="mx-auto w-1/2 mt-96 grid grid-cols-2 grid-flow-row gap-4">
      <Card>
        <CardHeader className="text-lg text-purple-400">
          Calculate your position size
        </CardHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent>
            <div className="mb-4">
              <Label htmlFor="accountBalance">Account balance</Label>
              <Input
                id="accountBalance"
                placeholder="Account balance"
                type="text"
                {...register('accountBalance', { required: true })}
                aria-invalid={!!errors.accountBalance}
              />
              {errors.accountBalance && (
                <p className="input-error">Account balance is required</p>
              )}
            </div>
            <div className="mb-4">
              <Label htmlFor="riskPercentage">Risk %</Label>
              <Input
                id="riskPercentage"
                placeholder="Risk % per trade"
                type="text"
                {...register('riskPercentage')}
                aria-invalid={!!errors.entryPrice}
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="entryPrice">Entry price</Label>
              <Input
                id="entryPrice"
                placeholder="Enter your entry price"
                type="text"
                {...register('entryPrice')}
                aria-invalid={!!errors.entryPrice}
              />
              {errors.entryPrice && (
                <p className="input-error">Entry price required</p>
              )}
            </div>
            <div className="mb-4">
              <Label className="mb-2 flex justify-between">Leverage <span>{leverage}x</span></Label>
              <Slider className="" defaultValue={[defaultLeverage]} max={100} step={1} onValueChange={([value])=> setLeverage(value)}/>
              <div></div>
            </div>
            <div className="mb-4">
              <Label htmlFor="sl">Stop loss</Label>
              <Input
                id="sl"
                placeholder="Stop loss price"
                type="text"
                {...register('sl')}
                aria-invalid={!!errors.entryPrice}
              />
            </div>
            <div>
              <Label htmlFor="tp">Take profit</Label>
              <Input
                id="tp"
                placeholder="Take profit price"
                type="text"
                {...register('tp')}
                aria-invalid={!!errors.entryPrice}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="default" size="lg" className="flex-1">
              Calculate
              <MagicWandIcon className="ml-2" />
            </Button>
          </CardFooter>
        </form>
      </Card>
      <Card className="p-6 bg-slate-900">
        <div className="flex justify-between mb-4">
          <span className="mr-4 font-bold">RRR</span>
          {positionSize?.r3 && `1:${positionSize?.r3}`}
        </div>
        <div className="flex justify-between mb-4">
          <span className="mr-4 font-bold">Risk amount</span>
          {positionSize?.riskAmount}
        </div>
        <div className="flex justify-between mb-4">
          <span className="mr-4 font-bold">Position Size</span>
          {positionSize?.size}
        </div>
        <div className="flex justify-between mb-4">
          <span className="mr-4 font-bold">Capital</span>
          {positionSize?.requiredCapital}
        </div>
        <div className="flex justify-between mb-4">
          <span className="mr-4 font-bold">Capital with leverage</span>
          {positionSize?.withLeverage}
        </div>
      </Card>
    </div>
  );
};

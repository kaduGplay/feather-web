'use client';
import { useState } from 'react';

import { apiClient } from '@src/services';

import { useForm } from 'react-hook-form';

import toast from 'react-hot-toast';

import { IService } from '@src/interfaces';

import { CgMathPercent } from "react-icons/cg";

interface IFormData {
  code: string;
}

export function Coupon({
  service,
  setDiscount,
  setTotal,
  setSubtotal,
  handleCoupon,
  loadingPay,
}: {
  service: IService | undefined;
  setDiscount: (discount: number) => void;
  setTotal: (total: number) => void;
  setSubtotal: (subtotal: number) => void;
  handleCoupon: (code: string) => void;
  loadingPay: boolean;
}) {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormData>();

  async function onSubmit({ code }: IFormData) {
    setLoading(true);

    if (!code) {
      toast.error('Você precisa preencher os campos.');

      return setLoading(false);
    }

    await apiClient
      .get(`/coupons/apply/${code}/${service?.id}`)
      .then(response => {
        toast.success('O cupom foi aplicado com sucesso.');

        setTotal(response.data.total);
        setDiscount(response.data.discount);
        setSubtotal(response.data.subtotal);

        handleCoupon(code);
      })
      .catch(error => {
        toast.error(error.response.data.message);

        return setLoading(false);
      });
  }

  return (
    <form
      className="flex justify-between items-center gap-[10px] mt-5"
      onSubmit={handleSubmit(onSubmit)}
    >
      <input
        id="coupon"
        type="text"
        className={`w-full bg-transparent border border-black/30 dark:border-white/10 p-3 rounded-lg text-[14px] md:text-[15px] font-light`}
        placeholder="Insira o cupom (Opcional)"
        readOnly={loading}
        {...register('code', { required: true })}
      />
      <button
        type="submit"
        aria-label="Validar"
        disabled={loading || loadingPay}
        className="flex items-center border border-black/30 dark:border-white/10 py-3 px-3 rounded-md scale-90 transition-all duration-300 ease-in-out bg-white dark:bg-black text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black">
        <span className="mr-2"><CgMathPercent fontWeight={100}
          className="text-2xl" /></span>
        Aplicar
      </button>
    </form>
  );
}

'use client'

import Button from '@/components/Button';
import notFoundImg from '../../public/assets/error-not-found.svg';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function NotFoundPage() {
  const router = useRouter();

  return (
    <main className="bg-titanWhite h-screen w-screen flex items-center justify-center lg:justify-evenly flex-col lg:flex-row min-h-[768px]">
      <Image src={notFoundImg} alt="Imagem ilustrativa de uma mulher olhando para um computador com o erro 404." />
      <div className="max-w-sm">
        <p className="text-tuna text-4xl font-medium hidden lg:block">Está página não foi encontrada :(</p>
        <Button color="hippieGreen" className="w-full mt-5 min-w-[280px]" type="button" onClick={() => router.back()}>Voltar para a página inicial</Button>
      </div>
    </main>
  );
}

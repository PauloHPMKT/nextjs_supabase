'use client'
import Image from "next/image";
import { FormEvent, use, useCallback, useState } from "react";
import supabase from "./api/supabase";

export default function Home() {
  /**
   * a utilizando de state nesse caso é apenas para exemplificar
   * o recomendado é utilizar uma biblioteca ou hook para tratar 
   * o form
   */
  const [email, setEmail] = useState('');
  const [saving, setSaving] = useState(false);

  const signNewsLetter = useCallback(async (e: FormEvent) => {
    e.preventDefault();
    
    setSaving(true);

    /**
     * Validar campo vazio
     */
    console.log(email)
    /**
     * Usar algum toast para tratamento de alertas
     */
    const { data, error, status } = await supabase
      .from('users')
      .insert({ email });

    if (error) {
      if (status === 409) {
        alert('User already signed up');
      } else {
        alert('Error signing up for newsletter')
      }
      console.log("Error ", error); 
      setSaving(false);
      return 
    }

    alert('Successfully signed up for newsletter')
    console.log(data);
    setSaving(false);
    setEmail('');
  }, [email])

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="container sm mx-auto p-8 flex justify-center items-center flex-col w-1/2 bg-ice rounded-md h-auto">
        <Image 
          alt="letter logo"
          src="/img/latter.png"
          width={70}
          height={70} 
          className="mb-8"
        />
        <h1 className="text-2xl text-slate-700 font-semibold">Newletter Tech Devmais</h1>
        <p className="text-sm py-4 text-slate-500">
          Assine a newsletter do tech devmais sobre programação
        </p>
        <form onSubmit={signNewsLetter}>
          <input 
            type="email" 
            placeholder="Seu melhor e-mail" 
            className="px-4 py-2 rounded text-black border"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <button 
            type="submit"
            className="ms-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            style={{ pointerEvents: saving ? 'none' : 'all' }}
          >
            Inscrever
          </button>
        </form>
      </div>
    </main>
  )
}

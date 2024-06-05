import { useState } from 'react'
import { createPortal } from 'react-dom'

function Dialog({
  open,
  onClose,
  children
}) {
  return createPortal(
    <div>
      <div className={`${!open && 'hidden'} fixed top-0 left-0 w-full h-full bg-neutral-950 opacity-20 z-1`} onClick={onClose}></div>
      <div className={`${!open && 'hidden'} fixed top-5 left-[50%] -translate-x-1/2 bg-[#fff] rounded-lg w-[calc(100%-2.5rem)] md:w-[32rem] p-5`}>
        {children}
      </div>
    </div>,
    document.body
  )
}

let viewed = localStorage.getItem('viewed')

if (viewed === null) {
  requestView()
  localStorage.setItem('viewed', true)
}

async function requestView() {
  await fetch(`https://balancify.netlify.app/.netlify/functions/view`, {
    method: 'post'
  })
}

export default function Root() {
  const [loading, setLoading] = useState(false)
  const [modal1Open, setModal1Open] = useState(false)
  const [modal2Open, setModal2Open] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()

    const formData = new FormData(event.target)
    const email = formData.get('email')
    const name = formData.get('name')

    setLoading(true)

    await fetch('https://balancify.netlify.app/.netlify/functions/api', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, name })
    })

    event.target.reset()
    setLoading(false)
    setModal1Open(false)
    setModal2Open(true)
  }

  return (
    <>
      <div className='bg-[radial-gradient(circle_at_top_left,_#ddd6fe_10%,_transparent_20%),_radial-gradient(circle_at_center,_#ddd6fe_10%,_transparent_80%)] md:bg-[radial-gradient(circle_at_top_left,_#ddd6fe_10%,_transparent_40%),_radial-gradient(ellipse_at_center,_#ddd6fe_10%,_transparent_40%)]'>
        <header className='h-14 flex items-center justify-center'>
          <h1 className='font-bold text-2xl'>balancify</h1>
        </header>
        <main className='flex flex-col items-center justify-center px-5 md:px-24 py-24'>
          <h2 className='font-bold text-3xl md:text-5xl text-center'>
            Akuntansi dibikin Gampang!
          </h2>
          <p className='text-center mt-4'>
            Kerjakan Soal Akuntansi dengan Cepat, Akurat, Tanpa Takut Tidak
            Balance.
          </p>
          <button className='rounded-lg bg-violet-600 hover:bg-violet-700 shadow-md hover:shadow-lg text-white transition py-2 px-5 mt-8' onClick={() => setModal1Open(true)}>
            Daftar Gratis
          </button>
          <img
            className='aspect-video rounded-lg w-full mt-14'
            src='/thumbnail-1.png'
          />
        </main>
      </div>
      <div>
        <section className='flex flex-col md:grid md:grid-cols-2 md:gap-10 px-5 md:px-24 py-24'>
          <div className='md:flex md:flex-col md:justify-center'>
            <h2 className='font-bold text-2xl md:text-4xl'>
              Tugasmu Akan Selesai dengan Lebih Cepat
            </h2>
            <p className='mt-4'>
              Hanya sekali entri menggunakan jurnal umum atau jurnal khusus,
              maka buku besar, neraca saldo, worksheet, dan laporan keuangan
              akan dibuat secara otomatis.
            </p>
          </div>
          <div className='md:flex md:flex-col md:justify-center'>
            <img
              className='aspect-video rounded-lg w-full mt-14 md:mt-0 shadow-lg'
              src='/thumbnail-2.png'
            />
          </div>
        </section>
      </div>
      <div>
        <section className='flex flex-col md:grid md:grid-cols-2 md:gap-10 px-5 md:px-24 py-24'>
          <div className='md:flex md:flex-col md:justify-center'>
            <h2 className='font-bold text-2xl md:text-4xl'>
              Akses dimana Saja
            </h2>
            <p className='mt-4'>
              Balancify dibuat menggunakan teknologi web, yang dapat diakses
              melalui bowser, tanpa perlu menginstal.
            </p>
          </div>
          <div className='md:flex md:flex-col md:justify-center'>
            <img
              className='aspect-video rounded-lg w-full mt-14 md:mt-0 shadow-lg'
              src='/thumbnail-3.png'
            />
          </div>
        </section>
      </div>
      <div>
        <section className='flex flex-col md:grid md:grid-cols-2 md:gap-10 px-5 md:px-24 py-24'>
          <div className='md:flex md:flex-col md:justify-center'>
            <h2 className='font-bold text-2xl md:text-4xl'>
              Dibuat oleh Siswa Akuntansi, untuk Siswa Akuntansi
            </h2>
            <p className='mt-4'>
              Dengan tampilan mirip seperti pada akuntansi praktik, Anda akan
              lebih familiar sehingga tugas Anda akan selesai dengan lebih cepat.
            </p>
          </div>
          <div className='md:flex md:flex-col md:justify-center px-12 md:px-24'>
            <img className='w-full mt-14 md:mt-0' src='/thumbnail-4.png' />
          </div>
        </section>
      </div>
      <div className='px-5 md:px-24'>
        <section className='flex flex-col px-5 md:px-24 py-12 items-center'>
          <h2 className='font-bold text-2xl md:text-4xl text-center'>
            Ayo Daftar Sekarang, Gratis!
          </h2>
          <button className='rounded-lg bg-violet-600 hover:bg-violet-700 shadow-md hover:shadow-lg text-white transition py-2 px-5 mt-8 w-auto' onClick={() => setModal1Open(true)}>
            Daftar Gratis
          </button>
        </section>
      </div>
      <div className='px-5 md:px-24'>
        <section className='flex flex-col px-5 md:px-24 py-12 items-center'>
          <h2 className='font-bold text-2xl md:text-4xl text-center'>
            Ada Pertanyaan? Hubungi Kami
          </h2>
          <div className='flex flex-col items-center md:flex-row gap-3 mt-6'>
            <a href='https://wa.me/6281325373310' target='_blank'>WhatsApp</a>
            <a href='https://m.facebook.com/profile.php?id=100070880303274' target='_blank'>Facebook</a>
            <a href='https://www.instagram.com/pikriawan_' target='_blank'>Instagram</a>
          </div>
        </section>
      </div>
      <div className='px-5 md:px-24'>
        <footer className='flex flex-col px-5 md:px-24 py-12 items-center'>
          <p>&copy; 2024</p>
        </footer>
      </div>
      <Dialog open={modal1Open} onClose={() => setModal1Open(false)}>
        <h2 className='font-bold text-2xl md:text-4xl'>
            Dapatkan Notifikasi
        </h2>
        <p className='mt-4'>
          Balancify masih dalam tahap pengembangan. Kami akan memberi tahu Anda melalui email ketika Balancify sudah tersedia.
        </p>
        <form className='mt-4' onSubmit={handleSubmit}>
          <div>
            <label className='text-sm' htmlFor='name'>Nama</label>
            <input
              id='name'
              className='w-full bg-violet-100 hover:outline-2 focus:outline-violet-600 rounded-lg p-2'
              disabled={loading}
              name='name'
              type='text'
              placeholder='Nama Anda'
              required
            />
          </div>
          <div className='mt-4'>
            <label className='text-sm' htmlFor='email'>Email</label>
            <input
              id='email'
              className='w-full bg-violet-100 hover:outline-2 focus:outline-violet-600 rounded-lg p-2'
              disabled={loading}
              name='email'
              type='email'
              placeholder='example@email.com'
              required
            />
          </div>
          <button disabled={loading} className={`${loading ? 'bg-neutral-300' : 'bg-violet-600 hover:bg-violet-700 shadow-md hover:shadow-lg'} relative rounded-lg text-white transition py-2 px-5 w-full mt-4 flex justify-center items-center`}>
              <div className={`${loading ? 'visible' : 'invisible'} absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2`} role='status'>
                <svg aria-hidden='true' className='w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600' viewBox='0 0 100 101' fill='none' xmlns='http://www.w3.org/2000/svg'>
                    <path d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z' fill='#fff'/>
                    <path d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z' fill='#d4d4d4'/>
                  </svg>
                <span className='sr-only'>Loading...</span>
              </div>
              <span className={loading ? 'invisible' : 'visible'}>
                Kirim
              </span>
          </button>
        </form>
      </Dialog>
      <Dialog open={modal2Open} onClose={() => setModal1Open(false)}>
        <h2 className='font-bold text-2xl md:text-4xl'>
            Thanks!
        </h2>
        <p className='mt-4'>
          Terima kasih atas partisipasi Anda. Kami akan memberitahu Anda jika Balancify sudah tersedia.
        </p>
        <button className='rounded-lg bg-violet-600 hover:bg-violet-700 shadow-md hover:shadow-lg text-white transition py-2 px-5 w-full mt-4' onClick={() => setModal2Open(false)}>Oke</button>
      </Dialog>
    </>
  )
}
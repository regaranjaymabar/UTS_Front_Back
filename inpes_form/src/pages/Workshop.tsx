import Button from "../components/ui/Button";

export default function Workshop (){
    return (
        <div>
            <section
                      id='workshop'
                      className='py-10 flex gap-10 justify-between items-center bg-red-50 w-full py-10'
                    >
                      <div className='w-1/2'>
                        <img
                          src="https://www.invofest-harkatnegeri.com/assets/Maskot-Workshop.png"
                          alt=""
                        />
                      </div>
                      <div className='w-2/3 flex flex-col gap-6'>
                        <h1 className='text-5xl text-red-800 font-semibold'>IT Workshop</h1>
                        <p className='text-sm md:text base lg:text-[1.35rem]'>
                          Workshop "AI for a Sustainable Future: The Role of Z Generation in the Digital Era” ini menjembatani antara potensi Generasi Z dan kekuatan AI untuk menciptakan masa depan yang berkelanjutan. Peserta akan dibekali wawasan dan alat untuk mentransformasi ide-ide inovatif menjadi solusi lingkungan yang nyata dan terukur di era digital.
                        </p>
                        <div className='flex gap-3'> 
                          <Button label="Daftar IT Workshop" variant="primary" />
                        </div>
                      </div>
                    </section>
        </div>
    )
}
import Button from "../components/ui/Button";

export default function Competition (){
    return (
        <div>
            <section
                      id='competition'
                      className='bg-red-50 w-full py-10'
                    >
                      <div className= 'max-w-7xl mx-auto px-6 flex flex-col md:flex-row gap-10 justify-between items-center w-full'>
                        <div className='w-2/3 flex flex-col gap-6'>
                          <h1 className='text-5xl text-red-800 font-semibold'>IT Competition</h1>
                          <p className='text-sm md:text base lg:text-[1.35rem]'>
                            <b>"From Creation to Innovation"</b> adalah sebuah kompetisi IT yang dirancang untuk menjembatani jurang antara ide kreatif dan inovasi nyata. Ajang ini menantang para talenta digital untuk tidak hanya menciptakan sesuatu yang baru, tetapi juga mengembangkannya menjadi solusi yang berdampak, berkelanjutan, dan bernilai guna tinggi.
                          </p>
                          <div className='flex gap-3'>
                            <Button label="Daftar IT Competition" variant="primary"  />
                          </div>
                        </div>
                        <div className='w-2/3'>
                          <img
                            src="https://www.invofest-harkatnegeri.com/assets/Maskot-Lomba.png"
                            alt=""
                          />
                        </div>
                      </div>
                    </section>
        </div>
    )
}
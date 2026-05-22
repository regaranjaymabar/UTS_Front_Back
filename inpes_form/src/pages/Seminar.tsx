import Button from "../components/ui/Button";

export default function Seminar (){
    return (
        <div>
            <section
                      id='seminar'
                      className='py-10 flex gap-10 justify-between items-center bg-red-50 w-full py-10'
                    >
                      <div className='w-1/3'>
                        <img
                          src="https://www.invofest-harkatnegeri.com/assets/Maskot-Seminar.png"
                          alt=""
                        />
                      </div>
                      <div className='w-2/3 flex flex-col gap-6'>
                        <h1 className='text-5xl text-red-800 font-semibold'>IT Seminar</h1>
                        <p className='text-sm md:text base lg:text-[1.35rem]'>
                          Seminar Nasional Teknologi Informasi ini mengangkat tema <b>"Human-AI Integration: Merancang Arsitektur Kolaboratif, Bukan Kompetitif.”</b>Kami bertujuan untuk menggeser fokus dari ketakutan akan kompetisi menjadi eksplorasi peluang kolaborasi. Seminar ini akan mengupas tuntas bagaimana kita dapat merancang sistem, etika, dan lingkungan kerja di mana AI berfungsi sebagai mitra yang memperkuat kecerdasan, kreativitas, dan produktivitas manusia—bukan sebagai pengganti.
                        </p>
                        <div className='flex gap-3'> 
                          <Button label="Daftar IT Seminar" variant="primary" />
                        </div>
                      </div>
                    </section>
        </div>
    );
}
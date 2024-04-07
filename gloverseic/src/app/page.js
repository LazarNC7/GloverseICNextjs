import Hero from "../components/layout/Hero";
import HomeMenu from "../components/layout/HomeMenu";
import SectionHeaders from "../components/layout/SectionHeaders";

export default function Home() {
  return (
      <>
        <Hero />
        <HomeMenu />
        <section className="text-center my-16" id="about">
          <SectionHeaders
              subHeader={'Our story'}
              mainHeader={'About us'}
          />
          <div className="text-grey-500 max-w-2xl mx-auto mt-4 flex flex-col gap-4">
            <p>
              I am a results-oriented professional with a strong
              background in marketing and project management, holding a
              Bachelor degree in Business Administration. Experienced in
              developing and executing successful marketing campaigns, I have
              consistently contributed to increased brand visibility and customer
              engagement. Proficient in leveraging digital marketing channels,
              including social media, I bring a strategic mindset
              and analytical skills to drive marketing objectives.

            </p>
            <p>
              Beyond marketing, I excel in project management, overseeing end-to-end
              planning and execution of cross-functional initiatives. With a collaborative
              approach and effective communication, I have successfully achieved project
              milestones and delivered high-quality outcomes. Adaptable and detail-oriented,
              I am now seeking opportunities to apply my skills and passion for driving business
              success through strategic marketing and project management.
            </p>
          </div>
        </section>
        <section className="text-center my-8" id="contact">
          <SectionHeaders
              subHeader={'Do not hesitate'}
              mainHeader={'Contact us'}
          />
          <div className="mt-8">
            <a className="text-4xl text-primary" href="tel:+40767251576">+40745251578</a>
          </div>
        </section>

      </>
  )
}


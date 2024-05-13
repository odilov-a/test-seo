import { useGet, useHooks } from "hooks";
import { uniqueId } from "lodash";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useEffect } from "react";
import useStore from "store";
gsap.registerPlugin(ScrollTrigger);

const PartnersSection = () => {
  const { get } = useHooks()

  const { data } = useGet({
    name: "partners",
    url: "partners",
    onSuccess: (data) => {
    },
    onError: (error) => {
    },
  });
  const {
    system: { loadingStatus },
  } = useStore();
  const partnersData = get(data, "data", [])
  let mm = gsap.matchMedia();
  useEffect(() => {
    if (loadingStatus) {
      mm.add("(min-width: 800px)", () => {
        gsap.utils.toArray(".client").forEach((section, index) => {
          gsap.from(section as gsap.DOMTarget, {
            opacity: 0,
            scale: 0,
            delay: 0.2,
            duration: 1,
            scrollTrigger: {
              trigger: section as gsap.DOMTarget,
              start: "50% 50%",
              toggleActions: "play none none none",
            },
          });
        });
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [loadingStatus]);
  return (
    <div className="sixth-section_clients">
      {partnersData.map((cl) => (
        <div key={uniqueId("cl")} className="client">
          <picture className="client_img">
            <source media="(max-width:450px)" srcSet={get(cl, "srcMobile")} />
            <source media="(max-width:990px)" srcSet={get(cl, "srcTablet")} />
            <img src={get(cl, "image[0].medium")} alt={get(cl, "title")} />
          </picture>
        </div>
      ))}
    </div>
  );
};

export default PartnersSection;

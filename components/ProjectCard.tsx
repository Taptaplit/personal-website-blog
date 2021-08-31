import Link from "next/link";
import Image from "next/image";

type Props = {
  id?: string;
  title?: string;
  image?: string;
  description?: string;
  timestamp?: Date;
};

const ProjectCard = ({ title, image = "", description = "", timestamp, id }: Props) => {
  let desc: string = "";
  if (description.length > 110) {
    for (let i = 0; i < description.length; i++) {
      if (i < 110) {
        desc += description[i];
      }
    }
    desc += "...";
  } else {
    desc = description;
  }
  return (
    <Link href={`/blog/${id}`}>
      <div className="projectContainer max-h-auto ml-10 mr-10 m-2 bg-white p-3 flex flex-wrap md:flex-nowrap">
        <div className="">
          <Image src={image} width="100%" height="100%" />
        </div>
        <div className="words w-full md:w-8/12 flex flex-wrap flex-col">
          <h1>{title}</h1>
          <p className="text-xs sm:text-sm text-gray-700">{desc}</p>
          <p className="text-xs text-gray-400">{timestamp}</p>
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;

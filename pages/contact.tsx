import { GetStaticProps } from "next";
import React from "react";
import { sanityClient } from "../sanity";
import PortableText from "react-portable-text";
import { ContactType } from "../typing";

interface Props {
  contact: [ContactType];
}

const contact = ({ contact }: Props) => {
  return (
    <div className="py-5">
      {contact.map((data: ContactType) => (
        <div
          key={data._id}
          className="max-w-7xl mx-auto flex flex-col items-center gap-5"
        >
          <div className="font-titleFont font-bold text-5xl border-b-[2px] border-b-cyan-800">
            {data.title}
          </div>
          <div className="w-3/5">
            <PortableText
              content={data.body}
              projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}
              dataset={process.env.NEXT_PUBLIC_SANITY_DATASET}
              serializers={{
                h1: (props: any) => (
                  <h1
                    className="my-5 text-3xl font-bold font-titleFont"
                    {...props}
                  />
                ),
                h2: (props: any) => (
                  <h2
                    className="my-5 text-2xl font-bold font-titleFont"
                    {...props}
                  />
                ),
                h3: (props: any) => (
                  <h3
                    className="my-5 text-xl font-bold font-titleFont"
                    {...props}
                  />
                ),
                li: ({ children }: any) => (
                  <li className="ml-4 list-disc">{children}</li>
                ),
                link: ({ href, children }: any) => (
                  <a href={href} className="text-cyan-500 hover:underline">
                    {children}
                  </a>
                ),
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default contact;

export const getStaticProps: GetStaticProps = async () => {
  const query = `
  *[_type == "contact"] {
    _id,
    title,
    body,
  }`;

  const contact = await sanityClient.fetch(query);

  return {
    props: {
      contact,
    },
  };
};

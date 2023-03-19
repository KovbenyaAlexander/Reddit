import React from "react";
import { GetServerSidePropsContext } from "next";
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "@/firebase/clientApp";
import { ICommunity } from "@/atoms/communitiesAtom";
import safeJsonStringify from "safe-json-stringify";
import NotFound from "@/components/Community/NotFound";

type CommunityPageProps = {
  communityData: ICommunity;
};

const CommunityPage: React.FC<CommunityPageProps> = ({ communityData }) => {
  if (!communityData) {
    return <NotFound />;
  }

  return <div>{communityData.id}</div>;
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  try {
    const communityDocRef = doc(
      firestore,
      "communities",
      context.query.communityId as string
    );
    const communityDoc = await getDoc(communityDocRef);

    // const data = JSON.parse(JSON.stringify(communityDoc));
    return {
      props: {
        communityData: communityDoc.exists()
          ? JSON.parse(
              safeJsonStringify({ id: communityDoc.id, ...communityDoc.data() })
            )
          : "",
      },
    };
  } catch (e) {
    console.log(`error durring getting a community`);
    console.log(e);
  }
}

export default CommunityPage;

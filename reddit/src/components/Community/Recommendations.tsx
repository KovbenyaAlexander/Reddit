import { ICommunity } from "@/atoms/communitiesAtom";
import { firestore } from "@/firebase/clientApp";
import useCommunityData from "@/hooks/useCommunityData";
import { Box, Button, Flex, Icon, Image, Text } from "@chakra-ui/react";
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaReddit } from "react-icons/fa";

const Recommendations: React.FC = () => {
  const [communities, setCommunities] = useState<ICommunity[]>([]);
  const [loading, setLoading] = useState(false);
  const { communityStateValue, toggleJoinCommunity } = useCommunityData();

  const getCommunityRecomendations = async () => {
    setLoading(true);

    try {
      const communityQuery = query(
        collection(firestore, "communities"),
        orderBy("numberOfMembers", "desc"),
        limit(5)
      );
      const communityDocs = await getDocs(communityQuery);
      const communities = communityDocs.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setCommunities(communities as ICommunity[]);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    getCommunityRecomendations();
  }, []);

  return (
    <>
      {/* @ts-ignore*/}
      <Flex
        direction="column"
        background="white"
        borderRadius="4"
        border="1px solid"
        borderColor="gray.300"
      >
        <Flex
          align="flex-end"
          color="white"
          p="6px 10px"
          height="70px"
          borderRadius="4px 4x 0px 0px"
          fontWeight="700"
          bgImage="url(/images/reddit_recommendations_banner.png)"
          backgroundSize="cover"
          bgGradient="linear-gradient(to bottom, rgba(0,0,0,0), rgba(0, 0, 0, 0.75)), url('/images/reddit_recommendations_banner.png')"
        >
          Top Communities
        </Flex>
        <Flex direction="column">
          {loading ? (
            <>Loading</>
          ) : (
            <>
              {communities.map((community, index) => {
                const isJoined = communityStateValue.mySnippets.some(
                  (item) => item.communityId === community.id
                );

                return (
                  // <Link key={community.id} href={`/r/${community.id}`}>
                  <>
                    {/* @ts-ignore*/}
                    <Flex
                      key={community.id}
                      align="center"
                      fontSize="10px"
                      borderBottom="1px solid"
                      borderColor="gray.200"
                      p="10px 12px"
                      position={"relative"}
                    >
                      <Flex width="80%" align="center">
                        <Flex width="15%">
                          <Text>{index + 1}</Text>
                        </Flex>
                        {/* @ts-ignore*/}
                        <Flex align="center" width="80%">
                          {community.imageURL ? (
                            <Image
                              src={community.imageURL}
                              borderRadius="full"
                              boxSize="28px"
                              mr="2"
                            />
                          ) : (
                            <Icon
                              as={FaReddit}
                              fontSize="30"
                              color="brand.100"
                              mr="2"
                            />
                          )}
                          <span
                            style={{
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                            }}
                          >
                            {community.id}
                          </span>
                        </Flex>
                      </Flex>

                      <Box position="absolute" right="10px">
                        <Button
                          height="22px"
                          fontSize="8pt"
                          variant={isJoined ? "outline" : "solid"}
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleJoinCommunity(community, isJoined);
                          }}
                        >
                          {isJoined ? "Joined" : "Join"}
                        </Button>
                      </Box>
                    </Flex>
                  </>
                  // </Link>
                );
              })}

              <Box p="10px 20px">
                <Button height="30px" width="100%">
                  View All
                </Button>
              </Box>
            </>
          )}
        </Flex>
      </Flex>
    </>
  );
};
export default Recommendations;

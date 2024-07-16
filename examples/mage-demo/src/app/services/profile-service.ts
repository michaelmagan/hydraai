import { Profile } from "../model/profile";

export const getProfiles = async () => {
  return sampleProfiles;
};

export let sampleProfiles: Profile[] = [
  {
    id: "1",
    name: "Alice",
    imageUrl: "https://example.com/alice.jpg",
    about: "I like to read and play the piano.",
  },
  {
    id: "2",
    name: "Bob",
    imageUrl: "https://example.com/bob.jpg",
    about: "I like to hike and bake bread.",
  },
  {
    id: "3",
    name: "Charlie",
    imageUrl: "https://example.com/charlie.jpg",
    about: "I like to play video games and watch movies.",
  },
  {
    id: "4",
    name: "David",
    imageUrl: "https://example.com/david.jpg",
    about: "I am a React developer and love creating interactive UIs.",
  },
  {
    id: "5",
    name: "Eve",
    imageUrl: "https://example.com/eve.jpg",
    about: "I enjoy painting and coding with Next.js.",
  },
  {
    id: "6",
    name: "Frank",
    imageUrl: "https://example.com/frank.jpg",
    about: "I am a full-stack developer working with React and Next.js.",
  },
  {
    id: "7",
    name: "Grace",
    imageUrl: "https://example.com/grace.jpg",
    about: "I love designing and developing web applications.",
  },
  {
    id: "8",
    name: "Hank",
    imageUrl: "https://example.com/hank.jpg",
    about: "I am passionate about learning new technologies and frameworks.",
  },
  {
    id: "9",
    name: "Ivy",
    imageUrl: "https://example.com/ivy.jpg",
    about: "I enjoy writing and developing with React.",
  },
  {
    id: "10",
    name: "Jack",
    imageUrl: "https://example.com/jack.jpg",
    about: "I love creating fast and scalable web apps with Next.js.",
  },
];

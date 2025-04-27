import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";

export const cleanJobDescription = (rawText: string): string => {
  return rawText
    .replace(/<[^>]*>/g, " ") //Remove Html tags
    .replace(/\s+/g, " ") // collapse whitespaces
    .replace(/[^\w\s.,;:!?\-/]/g, "") //remove special chars
    .trim()
    .substring(0, 10000); //limit to 10k
};

export const processAndCleanJobDescription = async (jobDescription: string) => {
  //clean first
  const cleaned = cleanJobDescription(jobDescription);

  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 2000,
    chunkOverlap: 200,
  });

  const chunks = await splitter.splitText(cleaned);
  return chunks.length > 1 ? chunks.join("\n\n----\n\n") : cleaned;
};

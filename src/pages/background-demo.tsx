import Background, { BackgroundImage, useSetBackgroundImage } from "@/big-brain/components/Background";

export default function BackgroundDemo() {
    const setBackgroundImage = useSetBackgroundImage()
    return (
      <Background
        className={`flex min-h-full flex-col justify-center items-center py-12 sm:px-6 lg:px-8 bg-cover bg-center`}
      >
        <button
          className="bg-gray-100 rounded p-5"
          onClick={() => setBackgroundImage(BackgroundImage.Forest)}
        >
          forest background
        </button>
        <button
          className="bg-gray-100 rounded p-5"
          onClick={() => setBackgroundImage(BackgroundImage.Sky)}
        >
          sky background
        </button>
        <button
          className="bg-gray-100 rounded p-5"
          onClick={() => setBackgroundImage(BackgroundImage.Space)}
        >
          space background
        </button>
      </Background>
    );
}
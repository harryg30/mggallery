type PictureProps = {
  imageUrl: string;
};

export default function Picture({ imageUrl }: PictureProps): JSX.Element {
  return (
    <>
      {imageUrl != "" ? (
        <>
          <ColSpan1 />
          <div className="col-span-1">
            <img src={imageUrl} />
          </div>
          <ColSpan1 />
        </>
      ) : (
        <></>
      )}
    </>
  );
}

function ColSpan1(): JSX.Element {
  return <div className="col-span-1"></div>;
}

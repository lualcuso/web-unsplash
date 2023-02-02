import { useLocation } from "react-router-dom";
import styled from "styled-components";

const StyleImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 420px;
  margin: 0 auto;
`

const StyledFullImage = styled.img`
  width: 100%;
`

const ImageDetail = () => {
  const { state } = useLocation();
  const { image } = state

  const toDataURL = async (url) => {
    const blob = await fetch(
      `${url}&client_id=9OrTxAvDHhbdGnBnn3XJ0Du0cHhcoFXKvJ3QDpuwGFk`
    ).then((res) => res.blob());
    return URL.createObjectURL(blob);
  }

  const downloadImage = async (name, url) => {
    const link = document.createElement("a");
    link.href = await toDataURL(url);
    link.download = `${name}.jpeg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  return (
    <StyleImageContainer>
      <StyledFullImage alt="Full" src={image.urls.full} />
      <h3>{`Author: ${image.user.name}`}</h3>
      <p>{`${image.likes} Likes`}</p>
      <button onClick={() => downloadImage(image.id, image.links.download)}>Download</button>
    </StyleImageContainer>
  );
};

export default ImageDetail;

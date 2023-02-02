import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledListContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledImage = styled.img`
  width: 100%;
  margin-bottom: 20px;
  display: block;
`;

const ImagesList = ({ images }) => {
  return (
    <StyledListContainer>
      {images.length ? (
        images.map((image) => {
          return (
            <Link to="/image-detail" state={{ image }}>
              <StyledImage alt="img" key={image.id} src={image.urls.small} />
            </Link>
          );
        })
      ) : (
        <div>
          <p>Please execute a search to load images</p>
        </div>
      )}
    </StyledListContainer>
  );
};

export default ImagesList;

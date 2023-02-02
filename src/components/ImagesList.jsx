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
`

const ImagesList = ({ images }) => {
  return (
    <StyledListContainer>
      {images.map((image) => {
        return (
          <StyledImage alt="img" key={image.id} src={image.urls.regular} />
        );
      })}
    </StyledListContainer>
  );
};

export default ImagesList;

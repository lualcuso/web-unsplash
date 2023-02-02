import { useEffect, useState } from "react";
import styled from "styled-components";
import { searchImages } from "../services/api"
import ImagesList from "../components/ImagesList";

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
  padding: 40px;
  max-width: 420px;
  margin: 0 auto;
`;

const StyledSearchContainer = styled.div`
  display: flex;
  justify-content: center;

  > input[type="text"] {
    margin-right: 10px;
    flex-grow: 1;
  }
`;

const StyledFilterContainer = styled.div`
  display: flex;
  gap: 10px;

  > div {
    flex-grow: 1;
    label {
      margin-right: 10px;
    }
  }
`;

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [totalPages, setTotalPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [imagesList, setImagesList] = useState([]);

  const [color, setColor] = useState(null);
  const colorItems = [
    { label: "None", value: null },
    { label: "Black & White", value: "black_and_white" },
    { label: "Black", value: "black" },
    { label: "White", value: "white" },
    { label: "Yellow", value: "yellow" },
    { label: "Orange", value: "orange" },
    { label: "Red", value: "red" },
    { label: "Purple", value: "purple" },
    { label: "Magenta", value: "magenta" },
    { label: "Green", value: "green" },
    { label: "Teal", value: "teal" },
    { label: "Blue", value: "blue" },
  ];

  const [orientation, setOrientation] = useState(null);
  const orientationItems = [
    { label: "None", value: null },
    { label: "Landscape", value: "landscape" },
    { label: "Portrait", value: "portrait" },
    { label: "Squarish", value: "squarish" },
  ];

  const getImages = async (page, term, color, orientation) => {
    const fetchedImages = await searchImages(
      page,
      term,
      color,
      orientation
    );

    if (page > 1) {
      setImagesList(imagesList.concat(fetchedImages.results));
    } else {
      setImagesList(fetchedImages.results);
      setTotalPage(fetchedImages.total_pages);
    }
  };

  useEffect(() => {
    getImages(currentPage, searchTerm, color, orientation);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, color, orientation]);

  const onScroll = () => {
    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = document.documentElement.clientHeight;
    if (scrollTop + clientHeight >= scrollHeight && currentPage > totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imagesList]);

  return (
    <StyledContainer>
      <StyledSearchContainer>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
          placeholder="Enter search term"
        />
        <button
          onClick={() => {
            if (searchTerm.length) {
              setImagesList([]);
              getImages(1, searchTerm, color, orientation);
            }
          }}
        >
          Search
        </button>
      </StyledSearchContainer>
      <StyledFilterContainer>
        <div>
          <label>Color</label>
          <select
            onChange={(e) => {
              setImagesList([])
              setCurrentPage(1)
              setColor(e.target.value);
            }}
          >
            {colorItems.map((color) => {
              return <option key={color.label} value={color.value}>{color.label}</option>;
            })}
          </select>
        </div>
        <div>
          <label>Orientation</label>
          <select
            onChange={(e) => {
              setImagesList([]);
              setCurrentPage(1);
              setOrientation(e.target.value);
            }}
          >
            {orientationItems.map((orientation) => {
              return (
                <option key={orientation.label} value={orientation.value}>{orientation.label}</option>
              );
            })}
          </select>
        </div>
      </StyledFilterContainer>
      <ImagesList images={imagesList} />
    </StyledContainer>
  );
};

export default Search;

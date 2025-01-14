import { Box, styled } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CancelIcon from '@mui/icons-material/Cancel';

import { useTheme } from '../../../contextAPI/ThemeContext';

type Props = {
  onOpen: () => void,
  onClear: () => void
}

const FilterIndicatorContainer = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '50px',
  width: '100%',
  position: 'sticky',
  top: 0,
  zIndex: 100,
  margin: '5px'
});

const Wrapper = styled(Box)({
  borderRadius: '30px'
});

const ItemWrapper = styled(Box)({
  padding: '5px 10px', 
  display: 'flex', 
  alignItems: 'center'
});

const SearchSection = styled(Box)({
  cursor: 'pointer', 
  marginRight: 1,
  display: 'flex',
  alignItems: 'center',
  padding: '0 5px'
});

const ClearSection = styled(Box)({
  cursor: 'pointer', 
  marginLeft: 1,
  padding: '0 5px'
});

export default function FilterIndicator(props: Props) {
  const { isThemeLight } = useTheme();
  const themeColor = {
    color: isThemeLight ? 'black' : 'white'
  };
  const themeBackgroundColor = {
    backgroundColor: isThemeLight ? 'white' : 'black'
  };

  return (
    <FilterIndicatorContainer>
      <Wrapper sx={themeBackgroundColor}>
        <ItemWrapper 
          sx={themeColor}>
          <SearchSection onClick={() => props.onOpen()}>
            <SearchIcon /> Search
          </SearchSection>
          <ClearSection
            onClick={() => props.onClear()}>
            <CancelIcon sx={themeColor}/>
          </ClearSection>
        </ItemWrapper>
      </Wrapper>
    </FilterIndicatorContainer>
  )
}

import UiFormSelects from '../form/UiFormSelects';
import { FormSelectItem } from '../../../misc/types/Forms';

type Props = {
  itemsPerPage: number;
  onItemsPerPageChanged: (itemsPerPage: number) => void;
}

export default function PageCounter(props: Props) {
  const { itemsPerPage } = props;  
  const formSelectItems: FormSelectItem[] = [
    { key: '10', value: '10' },
    { key: '30', value: '30' },
    { key: '50', value: '50' },
    { key: '100', value: '100' }
  ];

  const handleSelectChange = (value: string) => {
    props.onItemsPerPageChanged(parseInt(value));  
  };


  return (
    <UiFormSelects 
      title='Items per Page'
      selectedValue={itemsPerPage.toString()}
      items={formSelectItems}
      displayKey="value"
      valueKey="key"
      size='medium'
      fullWidth={true}
      onChange={handleSelectChange} />
  )
}

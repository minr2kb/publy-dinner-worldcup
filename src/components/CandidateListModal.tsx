import { LinkOutlined } from '@mui/icons-material';
import {
  Dialog,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import useCadidates from '../hooks/useCadidates';
import { FontWeightValues } from '../utils/fontTypes';

interface Props {
  open: boolean;
  onClose: () => void;
}

const CandidateListModal = (props: Props) => {
  const { open, onClose } = props;
  const { data: candidates } = useCadidates();

  return (
    <Dialog onClose={onClose} open={open}>
      <TableContainer component={Paper} id={'cadidates'} sx={{ maxWidth: '650px' }}>
        <Table aria-label={'simple table'} stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>{'이름'}</TableCell>
              <TableCell>{'내용'}</TableCell>
              <TableCell align={'right'}>{'링크'}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.values(candidates ?? {}).map(candidate => (
              <TableRow
                key={candidate.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell
                  component={'th'}
                  scope={'row'}
                  sx={{ fontWeight: FontWeightValues.BOLD }}
                >
                  {candidate.name}
                </TableCell>
                <TableCell>{candidate.description}</TableCell>
                <TableCell align={'right'}>
                  <IconButton href={candidate.mapUrl} target={'_blank'} sx={{ height: 40 }}>
                    <LinkOutlined />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Dialog>
  );
};

export default CandidateListModal;

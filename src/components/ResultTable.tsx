import {
  Box,
  Button,
  ButtonGroup,
  FormControlLabel,
  LinearProgress,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { useState } from 'react';
import useTournamentResult from '../hooks/useTournamentResult';
import { FontWeightValues } from '../utils/fontTypes';

const ResultTable = () => {
  const [tableType, setTableType] = useState<'장소별' | '유저별'>('장소별');
  const [participantFilter, setParticipantFilter] = useState<boolean>(false);

  const { rankingByPoint, userPickList } = useTournamentResult({
    onlyParticipants: participantFilter,
  });

  return (
    <Box sx={{ height: '100%' }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <FormControlLabel
          control={
            <Switch
              checked={participantFilter}
              onChange={e => {
                setParticipantFilter(e.target.checked);
              }}
            />
          }
          label={'회식 참가자만'}
        />
        <ButtonGroup color={'primary'}>
          <Button
            variant={tableType === '장소별' ? 'contained' : 'outlined'}
            sx={{ height: 40 }}
            onClick={() => {
              setTableType('장소별');
            }}
          >
            {'장소별'}
          </Button>
          <Button
            variant={tableType === '유저별' ? 'contained' : 'outlined'}
            sx={{ height: 40 }}
            onClick={() => {
              setTableType('유저별');
            }}
          >
            {'유저별'}
          </Button>
        </ButtonGroup>
      </Box>
      <TableContainer id={'cadidates'} sx={{ width: '100%', height: 'calc(100% - 48px)', mt: 2 }}>
        <Table stickyHeader>
          {tableType === '장소별' ? (
            <TableHead>
              <TableRow>
                <TableCell>{'순위'}</TableCell>
                <TableCell>{'장소명'}</TableCell>
                <TableCell>{'포인트'}</TableCell>
              </TableRow>
            </TableHead>
          ) : (
            <TableHead>
              <TableRow>
                <TableCell>{'순번'}</TableCell>
                <TableCell>{'유저명'}</TableCell>
                <TableCell>{'참가자'}</TableCell>
                <TableCell>{'선택한 장소'}</TableCell>
              </TableRow>
            </TableHead>
          )}
          {tableType === '장소별' ? (
            <TableBody>
              {rankingByPoint.map((rankingRow, index) => (
                <TableRow
                  key={rankingRow.name}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component={'th'} scope={'row'}>
                    {index + 1}
                  </TableCell>
                  <TableCell
                    component={'th'}
                    scope={'row'}
                    sx={{ fontWeight: FontWeightValues.BOLD }}
                  >
                    {rankingRow.name}
                  </TableCell>
                  <TableCell component={'th'} scope={'row'}>
                    <LinearProgress
                      variant={'determinate'}
                      value={(rankingRow.points / rankingByPoint[0].points) * 100}
                    />{' '}
                    {rankingRow.points}
                    {' / '}
                    {rankingByPoint[0].points}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          ) : (
            <TableBody>
              {userPickList.map((userPick, index) => (
                <TableRow
                  key={`${userPick.name}-${index}`}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component={'th'} scope={'row'}>
                    {index + 1}
                  </TableCell>
                  <TableCell
                    component={'th'}
                    scope={'row'}
                    sx={{ fontWeight: FontWeightValues.BOLD }}
                  >
                    {userPick.name}
                  </TableCell>
                  <TableCell
                    component={'th'}
                    scope={'row'}
                    sx={{ fontWeight: FontWeightValues.BOLD }}
                  >
                    {userPick.isParticipant ? 'O' : 'X'}
                  </TableCell>
                  <TableCell component={'th'} scope={'row'}>
                    {userPick.winners}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          )}
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ResultTable;

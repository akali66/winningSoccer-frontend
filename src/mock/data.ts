export interface League {
  id: number;
  name: string;
}

export interface Team {
  id: number;
  name: string;
  leagueId: number;
}

export interface Match {
  id: number;
  leagueId: number;
  homeTeamId: number;
  awayTeamId: number;
  score: string;
  historyH2H1: number;
  historyH2H2: number;
  historyH2H3: number;
  homeForm1: number;
  homeForm2: number;
  homeForm3: number;
  homeForm4: number;
  homeForm5: number;
  homeForm6: number;
  awayForm1: number;
  awayForm2: number;
  awayForm3: number;
  awayForm4: number;
  awayForm5: number;
  awayForm6: number;
  euroInitWin: string;
  euroInitDraw: string;
  euroInitLose: string;
  euroCurWin: string;
  euroCurDraw: string;
  euroCurLose: string;
  asiaInitHomeOdds: string;
  asiaInitHandicap: string;
  asiaInitAwayOdds: string;
  asiaCurHomeOdds: string;
  asiaCurHandicap: string;
  asiaCurAwayOdds: string;
  theoryWin: string;
  theoryDraw: string;
  theoryLose: string;
  theoryWater: string;
  remark: string;
  homeTeamRank?: number;
  awayTeamRank?: number;
}

export const mockLeagues: League[] = [
  {
    id: 2,
    name: "德甲",
  },
  {
    id: 1,
    name: "英超",
  },
];

export const mockTeams: Team[] = [
  {
    id: 1,
    name: "曼联",
    leagueId: 1,
  },
  {
    id: 2,
    name: "狼队",
    leagueId: 1,
  },
];

export const mockMatches: Match[] = [
  {
    id: 1,
    leagueId: 1,
    homeTeamId: 2,
    awayTeamId: 1,
    homeTeamRank: 20,
    awayTeamRank: 6,
    score: "1:4",
    historyH2H1: 1,
    historyH2H2: 1,
    historyH2H3: 0,
    homeForm1: 0,
    homeForm2: 0,
    homeForm3: 0,
    homeForm4: 0,
    homeForm5: 0,
    homeForm6: 0,
    awayForm1: 2,
    awayForm2: 1,
    awayForm3: 0,
    awayForm4: 2,
    awayForm5: 2,
    awayForm6: 1,
    euroInitWin: "4.60",
    euroInitDraw: "3.90",
    euroInitLose: "1.70",
    euroCurWin: "5.00",
    euroCurDraw: "3.90",
    euroCurLose: "1.65",
    asiaInitHomeOdds: "0.82",
    asiaInitHandicap: "-0.75",
    asiaInitAwayOdds: "0.78",
    asiaCurHomeOdds: "0.91",
    asiaCurHandicap: "-0.75",
    asiaCurAwayOdds: "0.70",
    theoryWin: "5.01",
    theoryDraw: "3.58",
    theoryLose: "1.57",
    theoryWater: "3.4",
    remark: "测试比赛数据",
  },
];

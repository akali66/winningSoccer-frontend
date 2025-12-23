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
  { id: 1, name: "英超" },
  { id: 2, name: "西甲" },
  { id: 3, name: "意甲" },
  { id: 4, name: "德甲" },
  { id: 5, name: "法甲" },
  { id: 6, name: "葡超" },
  { id: 7, name: "荷甲" },
  { id: 8, name: "比甲" },
  { id: 9, name: "土超" },
  { id: 10, name: "俄超" },
  { id: 11, name: "苏超" },
  { id: 12, name: "希腊超" },
  { id: 13, name: "瑞士超" },
  { id: 14, name: "奥甲" },
  { id: 15, name: "丹麦超" },
  { id: 16, name: "挪超" },
  { id: 17, name: "瑞典超" },
  { id: 18, name: "波兰超" },
  { id: 19, name: "捷克甲" },
  { id: 20, name: "克罗地亚甲" },
  { id: 21, name: "罗甲" },
  { id: 22, name: "乌超" },
  { id: 23, name: "塞超" },
  { id: 24, name: "斯伐超" },
  { id: 25, name: "匈甲" },
  { id: 26, name: "保甲" },
  { id: 27, name: "斯文甲" },
  { id: 28, name: "塞浦甲" },
  { id: 29, name: "以超" },
  { id: 30, name: "巴甲" },
  { id: 31, name: "阿甲" },
  { id: 32, name: "美职" },
  { id: 33, name: "日职" },
  { id: 34, name: "韩K" },
  { id: 35, name: "中超" },
];

export const mockTeams: Team[] = [
  { id: 1, name: "曼城", leagueId: 1 },
  { id: 2, name: "阿森纳", leagueId: 1 },
  { id: 3, name: "利物浦", leagueId: 1 },
  { id: 4, name: "阿斯顿维拉", leagueId: 1 },
  { id: 5, name: "热刺", leagueId: 1 },
  { id: 6, name: "曼联", leagueId: 1 },
  { id: 7, name: "纽卡斯尔", leagueId: 1 },
  { id: 8, name: "西汉姆联", leagueId: 1 },
  { id: 9, name: "切尔西", leagueId: 1 },
  { id: 10, name: "伯恩茅斯", leagueId: 1 },
  { id: 11, name: "皇家马德里", leagueId: 2 },
  { id: 12, name: "赫罗纳", leagueId: 2 },
  { id: 13, name: "巴塞罗那", leagueId: 2 },
  { id: 14, name: "马德里竞技", leagueId: 2 },
  { id: 15, name: "毕尔巴鄂竞技", leagueId: 2 },
  { id: 16, name: "皇家社会", leagueId: 2 },
  { id: 17, name: "国际米兰", leagueId: 3 },
  { id: 18, name: "尤文图斯", leagueId: 3 },
  { id: 19, name: "AC米兰", leagueId: 3 },
  { id: 20, name: "博洛尼亚", leagueId: 3 },
  { id: 21, name: "罗马", leagueId: 3 },
  { id: 22, name: "亚特兰大", leagueId: 3 },
  { id: 23, name: "勒沃库森", leagueId: 4 },
  { id: 24, name: "拜仁慕尼黑", leagueId: 4 },
  { id: 25, name: "斯图加特", leagueId: 4 },
  { id: 26, name: "多特蒙德", leagueId: 4 },
  { id: 27, name: "RB莱比锡", leagueId: 4 },
  { id: 28, name: "巴黎圣日耳曼", leagueId: 5 },
  { id: 29, name: "布雷斯特", leagueId: 5 },
  { id: 30, name: "摩纳哥", leagueId: 5 },
  { id: 31, name: "里尔", leagueId: 5 },
  { id: 32, name: "葡萄牙体育", leagueId: 6 },
  { id: 33, name: "埃因霍温", leagueId: 7 },
  { id: 34, name: "费耶诺德", leagueId: 7 },
  { id: 35, name: "凯尔特人", leagueId: 11 },
];

export const mockMatches: Match[] = [
  { id: 1, leagueId: 5, homeTeamId: 31, awayTeamId: 30, homeTeamRank: 12, awayTeamRank: 10, score: "0:0", historyH2H1: 3, historyH2H2: 4, historyH2H3: 4, homeForm1: 3, homeForm2: 0, homeForm3: 1, homeForm4: 2, homeForm5: 3, homeForm6: 2, awayForm1: 3, awayForm2: 1, awayForm3: 1, awayForm4: 0, awayForm5: 0, awayForm6: 2, euroInitWin: "2.84", euroInitDraw: "3.44", euroInitLose: "4.48", euroCurWin: "1.38", euroCurDraw: "3.46", euroCurLose: "4.53", asiaInitHomeOdds: "1.01", asiaInitHandicap: "-0.5", asiaInitAwayOdds: "1.01", asiaCurHomeOdds: "0.92", asiaCurHandicap: "-1", asiaCurAwayOdds: "1.01", theoryWin: "4.48", theoryDraw: "4.35", theoryLose: "1.84", theoryWater: "0.90", remark: "第1轮", },
  { id: 2, leagueId: 1, homeTeamId: 7, awayTeamId: 5, homeTeamRank: 7, awayTeamRank: 15, score: "2:3", historyH2H1: 0, historyH2H2: 5, historyH2H3: 5, homeForm1: 0, homeForm2: 1, homeForm3: 0, homeForm4: 1, homeForm5: 0, homeForm6: 2, awayForm1: 3, awayForm2: 1, awayForm3: 1, awayForm4: 2, awayForm5: 1, awayForm6: 3, euroInitWin: "2.21", euroInitDraw: "3.64", euroInitLose: "1.45", euroCurWin: "2.72", euroCurDraw: "3.06", euroCurLose: "1.96", asiaInitHomeOdds: "0.84", asiaInitHandicap: "0", asiaInitAwayOdds: "0.91", asiaCurHomeOdds: "0.89", asiaCurHandicap: "-0.5", asiaCurAwayOdds: "0.88", theoryWin: "3.76", theoryDraw: "3.78", theoryLose: "4.96", theoryWater: "0.88", remark: "第2轮", },
  { id: 3, leagueId: 1, homeTeamId: 6, awayTeamId: 8, homeTeamRank: 6, awayTeamRank: 17, score: "4:4", historyH2H1: 2, historyH2H2: 0, historyH2H3: 4, homeForm1: 2, homeForm2: 0, homeForm3: 1, homeForm4: 1, homeForm5: 2, homeForm6: 2, awayForm1: 0, awayForm2: 1, awayForm3: 1, awayForm4: 1, awayForm5: 3, awayForm6: 2, euroInitWin: "4.10", euroInitDraw: "3.44", euroInitLose: "1.24", euroCurWin: "3.52", euroCurDraw: "3.18", euroCurLose: "3.77", asiaInitHomeOdds: "0.90", asiaInitHandicap: "+1", asiaInitAwayOdds: "1.04", asiaCurHomeOdds: "0.87", asiaCurHandicap: "+0.5", asiaCurAwayOdds: "0.82", theoryWin: "3.78", theoryDraw: "3.30", theoryLose: "1.97", theoryWater: "0.93", remark: "第3轮", },
  { id: 4, leagueId: 4, homeTeamId: 23, awayTeamId: 26, homeTeamRank: 14, awayTeamRank: 6, score: "0:4", historyH2H1: 0, historyH2H2: 1, historyH2H3: 2, homeForm1: 3, homeForm2: 1, homeForm3: 1, homeForm4: 3, homeForm5: 2, homeForm6: 3, awayForm1: 3, awayForm2: 3, awayForm3: 0, awayForm4: 0, awayForm5: 0, awayForm6: 2, euroInitWin: "1.41", euroInitDraw: "3.08", euroInitLose: "2.05", euroCurWin: "4.28", euroCurDraw: "3.60", euroCurLose: "3.25", asiaInitHomeOdds: "0.88", asiaInitHandicap: "0", asiaInitAwayOdds: "0.89", asiaCurHomeOdds: "0.99", asiaCurHandicap: "0", asiaCurAwayOdds: "1.06", theoryWin: "1.98", theoryDraw: "3.10", theoryLose: "1.94", theoryWater: "0.98", remark: "第4轮", },
  { id: 5, leagueId: 2, homeTeamId: 14, awayTeamId: 16, homeTeamRank: 16, awayTeamRank: 16, score: "0:1", historyH2H1: 1, historyH2H2: 2, historyH2H3: 0, homeForm1: 2, homeForm2: 2, homeForm3: 2, homeForm4: 0, homeForm5: 2, homeForm6: 2, awayForm1: 1, awayForm2: 0, awayForm3: 1, awayForm4: 1, awayForm5: 3, awayForm6: 3, euroInitWin: "3.15", euroInitDraw: "4.06", euroInitLose: "4.56", euroCurWin: "3.05", euroCurDraw: "3.54", euroCurLose: "3.90", asiaInitHomeOdds: "0.99", asiaInitHandicap: "-1", asiaInitAwayOdds: "0.95", asiaCurHomeOdds: "0.89", asiaCurHandicap: "0", asiaCurAwayOdds: "0.98", theoryWin: "2.87", theoryDraw: "4.01", theoryLose: "3.56", theoryWater: "0.96", remark: "第5轮", },
  { id: 6, leagueId: 4, homeTeamId: 23, awayTeamId: 27, homeTeamRank: 11, awayTeamRank: 9, score: "2:3", historyH2H1: 0, historyH2H2: 4, historyH2H3: 3, homeForm1: 2, homeForm2: 3, homeForm3: 2, homeForm4: 2, homeForm5: 1, homeForm6: 2, awayForm1: 2, awayForm2: 2, awayForm3: 3, awayForm4: 1, awayForm5: 1, awayForm6: 1, euroInitWin: "1.48", euroInitDraw: "3.02", euroInitLose: "3.19", euroCurWin: "3.30", euroCurDraw: "3.23", euroCurLose: "2.29", asiaInitHomeOdds: "0.91", asiaInitHandicap: "+0.5", asiaInitAwayOdds: "0.80", asiaCurHomeOdds: "0.86", asiaCurHandicap: "+0.5", asiaCurAwayOdds: "1.08", theoryWin: "1.35", theoryDraw: "4.10", theoryLose: "4.79", theoryWater: "0.94", remark: "第6轮", },
  { id: 7, leagueId: 5, homeTeamId: 31, awayTeamId: 30, homeTeamRank: 19, awayTeamRank: 3, score: "4:0", historyH2H1: 3, historyH2H2: 4, historyH2H3: 4, homeForm1: 1, homeForm2: 3, homeForm3: 0, homeForm4: 0, homeForm5: 1, homeForm6: 1, awayForm1: 1, awayForm2: 0, awayForm3: 0, awayForm4: 3, awayForm5: 1, awayForm6: 2, euroInitWin: "2.90", euroInitDraw: "3.54", euroInitLose: "4.72", euroCurWin: "3.22", euroCurDraw: "4.06", euroCurLose: "3.30", asiaInitHomeOdds: "1.01", asiaInitHandicap: "-0.5", asiaInitAwayOdds: "1.05", asiaCurHomeOdds: "0.88", asiaCurHandicap: "+1", asiaCurAwayOdds: "0.96", theoryWin: "2.96", theoryDraw: "3.52", theoryLose: "1.26", theoryWater: "0.96", remark: "第7轮", },
  { id: 8, leagueId: 1, homeTeamId: 7, awayTeamId: 6, homeTeamRank: 1, awayTeamRank: 6, score: "2:1", historyH2H1: 4, historyH2H2: 2, historyH2H3: 1, homeForm1: 0, homeForm2: 3, homeForm3: 1, homeForm4: 1, homeForm5: 0, homeForm6: 1, awayForm1: 1, awayForm2: 3, awayForm3: 2, awayForm4: 2, awayForm5: 3, awayForm6: 0, euroInitWin: "3.25", euroInitDraw: "3.91", euroInitLose: "2.21", euroCurWin: "3.36", euroCurDraw: "3.24", euroCurLose: "2.68", asiaInitHomeOdds: "0.99", asiaInitHandicap: "-0.5", asiaInitAwayOdds: "0.83", asiaCurHomeOdds: "0.92", asiaCurHandicap: "+0.5", asiaCurAwayOdds: "0.96", theoryWin: "4.49", theoryDraw: "3.82", theoryLose: "5.06", theoryWater: "0.90", remark: "第8轮", },
  { id: 9, leagueId: 5, homeTeamId: 28, awayTeamId: 31, homeTeamRank: 4, awayTeamRank: 6, score: "0:4", historyH2H1: 3, historyH2H2: 2, historyH2H3: 2, homeForm1: 1, homeForm2: 1, homeForm3: 2, homeForm4: 0, homeForm5: 3, homeForm6: 1, awayForm1: 0, awayForm2: 0, awayForm3: 2, awayForm4: 3, awayForm5: 2, awayForm6: 0, euroInitWin: "4.72", euroInitDraw: "3.17", euroInitLose: "4.65", euroCurWin: "2.89", euroCurDraw: "4.46", euroCurLose: "2.54", asiaInitHomeOdds: "0.95", asiaInitHandicap: "-1", asiaInitAwayOdds: "0.98", asiaCurHomeOdds: "0.97", asiaCurHandicap: "-1", asiaCurAwayOdds: "0.98", theoryWin: "4.13", theoryDraw: "4.14", theoryLose: "4.36", theoryWater: "0.98", remark: "第9轮", },
  { id: 10, leagueId: 1, homeTeamId: 5, awayTeamId: 3, homeTeamRank: 2, awayTeamRank: 12, score: "4:2", historyH2H1: 3, historyH2H2: 2, historyH2H3: 1, homeForm1: 1, homeForm2: 1, homeForm3: 1, homeForm4: 2, homeForm5: 3, homeForm6: 1, awayForm1: 3, awayForm2: 2, awayForm3: 1, awayForm4: 0, awayForm5: 2, awayForm6: 3, euroInitWin: "2.13", euroInitDraw: "4.14", euroInitLose: "2.27", euroCurWin: "3.26", euroCurDraw: "3.18", euroCurLose: "1.57", asiaInitHomeOdds: "0.99", asiaInitHandicap: "0", asiaInitAwayOdds: "0.88", asiaCurHomeOdds: "0.86", asiaCurHandicap: "-0.5", asiaCurAwayOdds: "0.87", theoryWin: "2.56", theoryDraw: "4.16", theoryLose: "3.21", theoryWater: "0.86", remark: "第10轮", },
  { id: 11, leagueId: 5, homeTeamId: 29, awayTeamId: 30, homeTeamRank: 5, awayTeamRank: 19, score: "4:1", historyH2H1: 4, historyH2H2: 4, historyH2H3: 5, homeForm1: 2, homeForm2: 1, homeForm3: 1, homeForm4: 2, homeForm5: 0, homeForm6: 3, awayForm1: 2, awayForm2: 0, awayForm3: 0, awayForm4: 3, awayForm5: 2, awayForm6: 2, euroInitWin: "2.28", euroInitDraw: "3.90", euroInitLose: "5.04", euroCurWin: "2.21", euroCurDraw: "4.36", euroCurLose: "2.87", asiaInitHomeOdds: "1.03", asiaInitHandicap: "0", asiaInitAwayOdds: "0.88", asiaCurHomeOdds: "0.92", asiaCurHandicap: "+1", asiaCurAwayOdds: "0.93", theoryWin: "1.97", theoryDraw: "3.99", theoryLose: "3.11", theoryWater: "0.89", remark: "第11轮", },
  { id: 12, leagueId: 4, homeTeamId: 23, awayTeamId: 24, homeTeamRank: 10, awayTeamRank: 20, score: "0:0", historyH2H1: 0, historyH2H2: 1, historyH2H3: 3, homeForm1: 0, homeForm2: 0, homeForm3: 1, homeForm4: 1, homeForm5: 1, homeForm6: 0, awayForm1: 1, awayForm2: 2, awayForm3: 0, awayForm4: 2, awayForm5: 3, awayForm6: 0, euroInitWin: "2.46", euroInitDraw: "4.41", euroInitLose: "1.31", euroCurWin: "2.58", euroCurDraw: "3.15", euroCurLose: "4.18", asiaInitHomeOdds: "0.97", asiaInitHandicap: "-1", asiaInitAwayOdds: "1.09", asiaCurHomeOdds: "0.92", asiaCurHandicap: "+1", asiaCurAwayOdds: "1.04", theoryWin: "3.41", theoryDraw: "3.94", theoryLose: "4.29", theoryWater: "0.84", remark: "第12轮", },
  { id: 13, leagueId: 3, homeTeamId: 19, awayTeamId: 17, homeTeamRank: 7, awayTeamRank: 10, score: "1:4", historyH2H1: 1, historyH2H2: 1, historyH2H3: 5, homeForm1: 0, homeForm2: 2, homeForm3: 0, homeForm4: 1, homeForm5: 1, homeForm6: 1, awayForm1: 3, awayForm2: 3, awayForm3: 0, awayForm4: 1, awayForm5: 1, awayForm6: 0, euroInitWin: "3.16", euroInitDraw: "3.94", euroInitLose: "3.00", euroCurWin: "2.82", euroCurDraw: "3.38", euroCurLose: "4.74", asiaInitHomeOdds: "0.90", asiaInitHandicap: "0", asiaInitAwayOdds: "0.92", asiaCurHomeOdds: "0.94", asiaCurHandicap: "+0.5", asiaCurAwayOdds: "0.93", theoryWin: "2.24", theoryDraw: "4.29", theoryLose: "2.57", theoryWater: "0.82", remark: "第13轮", },
  { id: 14, leagueId: 3, homeTeamId: 18, awayTeamId: 20, homeTeamRank: 8, awayTeamRank: 14, score: "4:1", historyH2H1: 4, historyH2H2: 0, historyH2H3: 2, homeForm1: 2, homeForm2: 0, homeForm3: 3, homeForm4: 2, homeForm5: 2, homeForm6: 3, awayForm1: 3, awayForm2: 3, awayForm3: 0, awayForm4: 0, awayForm5: 1, awayForm6: 3, euroInitWin: "3.89", euroInitDraw: "4.04", euroInitLose: "3.63", euroCurWin: "5.05", euroCurDraw: "3.67", euroCurLose: "4.37", asiaInitHomeOdds: "1.03", asiaInitHandicap: "-0.5", asiaInitAwayOdds: "0.95", asiaCurHomeOdds: "1.02", asiaCurHandicap: "0", asiaCurAwayOdds: "0.90", theoryWin: "1.50", theoryDraw: "3.24", theoryLose: "3.75", theoryWater: "0.90", remark: "第14轮", },
  { id: 15, leagueId: 5, homeTeamId: 30, awayTeamId: 29, homeTeamRank: 9, awayTeamRank: 1, score: "2:1", historyH2H1: 3, historyH2H2: 0, historyH2H3: 5, homeForm1: 1, homeForm2: 3, homeForm3: 1, homeForm4: 0, homeForm5: 1, homeForm6: 3, awayForm1: 3, awayForm2: 1, awayForm3: 3, awayForm4: 0, awayForm5: 0, awayForm6: 0, euroInitWin: "1.44", euroInitDraw: "4.42", euroInitLose: "1.90", euroCurWin: "2.97", euroCurDraw: "3.14", euroCurLose: "2.81", asiaInitHomeOdds: "0.97", asiaInitHandicap: "-0.5", asiaInitAwayOdds: "1.07", asiaCurHomeOdds: "1.04", asiaCurHandicap: "0", asiaCurAwayOdds: "1.01", theoryWin: "3.53", theoryDraw: "3.41", theoryLose: "3.91", theoryWater: "0.89", remark: "第15轮", },
  { id: 16, leagueId: 4, homeTeamId: 24, awayTeamId: 27, homeTeamRank: 16, awayTeamRank: 7, score: "3:3", historyH2H1: 4, historyH2H2: 1, historyH2H3: 0, homeForm1: 1, homeForm2: 1, homeForm3: 2, homeForm4: 3, homeForm5: 1, homeForm6: 1, awayForm1: 1, awayForm2: 2, awayForm3: 2, awayForm4: 2, awayForm5: 3, awayForm6: 0, euroInitWin: "2.60", euroInitDraw: "3.89", euroInitLose: "1.35", euroCurWin: "3.17", euroCurDraw: "3.24", euroCurLose: "3.12", asiaInitHomeOdds: "0.84", asiaInitHandicap: "-0.5", asiaInitAwayOdds: "1.05", asiaCurHomeOdds: "0.87", asiaCurHandicap: "-1", asiaCurAwayOdds: "1.06", theoryWin: "4.44", theoryDraw: "4.24", theoryLose: "1.23", theoryWater: "0.92", remark: "第16轮", },
  { id: 17, leagueId: 3, homeTeamId: 18, awayTeamId: 20, homeTeamRank: 18, awayTeamRank: 10, score: "4:4", historyH2H1: 2, historyH2H2: 1, historyH2H3: 2, homeForm1: 1, homeForm2: 2, homeForm3: 0, homeForm4: 3, homeForm5: 3, homeForm6: 2, awayForm1: 1, awayForm2: 0, awayForm3: 3, awayForm4: 2, awayForm5: 0, awayForm6: 3, euroInitWin: "3.08", euroInitDraw: "3.46", euroInitLose: "4.43", euroCurWin: "1.53", euroCurDraw: "4.39", euroCurLose: "2.61", asiaInitHomeOdds: "1.00", asiaInitHandicap: "+1", asiaInitAwayOdds: "0.80", asiaCurHomeOdds: "0.98", asiaCurHandicap: "+0.5", asiaCurAwayOdds: "0.83", theoryWin: "4.94", theoryDraw: "3.97", theoryLose: "3.95", theoryWater: "0.85", remark: "第17轮", },
  { id: 18, leagueId: 4, homeTeamId: 24, awayTeamId: 23, homeTeamRank: 20, awayTeamRank: 7, score: "2:3", historyH2H1: 3, historyH2H2: 0, historyH2H3: 4, homeForm1: 0, homeForm2: 3, homeForm3: 3, homeForm4: 3, homeForm5: 3, homeForm6: 0, awayForm1: 0, awayForm2: 1, awayForm3: 1, awayForm4: 2, awayForm5: 2, awayForm6: 3, euroInitWin: "2.26", euroInitDraw: "3.28", euroInitLose: "3.24", euroCurWin: "2.18", euroCurDraw: "4.36", euroCurLose: "1.55", asiaInitHomeOdds: "0.93", asiaInitHandicap: "+1", asiaInitAwayOdds: "0.80", asiaCurHomeOdds: "0.80", asiaCurHandicap: "-1", asiaCurAwayOdds: "1.04", theoryWin: "1.29", theoryDraw: "3.36", theoryLose: "4.45", theoryWater: "0.84", remark: "第18轮", },
  { id: 19, leagueId: 4, homeTeamId: 23, awayTeamId: 26, homeTeamRank: 8, awayTeamRank: 1, score: "0:1", historyH2H1: 1, historyH2H2: 0, historyH2H3: 0, homeForm1: 2, homeForm2: 3, homeForm3: 1, homeForm4: 3, homeForm5: 1, homeForm6: 2, awayForm1: 1, awayForm2: 0, awayForm3: 2, awayForm4: 0, awayForm5: 2, awayForm6: 1, euroInitWin: "4.29", euroInitDraw: "4.07", euroInitLose: "1.99", euroCurWin: "3.25", euroCurDraw: "3.50", euroCurLose: "4.32", asiaInitHomeOdds: "0.93", asiaInitHandicap: "+1", asiaInitAwayOdds: "1.04", asiaCurHomeOdds: "0.91", asiaCurHandicap: "+0.5", asiaCurAwayOdds: "1.07", theoryWin: "2.76", theoryDraw: "3.73", theoryLose: "4.36", theoryWater: "0.95", remark: "第19轮", },
  { id: 20, leagueId: 5, homeTeamId: 30, awayTeamId: 28, homeTeamRank: 4, awayTeamRank: 6, score: "4:4", historyH2H1: 3, historyH2H2: 1, historyH2H3: 2, homeForm1: 1, homeForm2: 1, homeForm3: 0, homeForm4: 3, homeForm5: 3, homeForm6: 3, awayForm1: 3, awayForm2: 2, awayForm3: 3, awayForm4: 1, awayForm5: 3, awayForm6: 1, euroInitWin: "1.28", euroInitDraw: "3.15", euroInitLose: "3.11", euroCurWin: "3.01", euroCurDraw: "3.41", euroCurLose: "2.56", asiaInitHomeOdds: "1.03", asiaInitHandicap: "+1", asiaInitAwayOdds: "0.83", asiaCurHomeOdds: "1.08", asiaCurHandicap: "+1", asiaCurAwayOdds: "0.84", theoryWin: "2.28", theoryDraw: "3.08", theoryLose: "3.70", theoryWater: "0.85", remark: "第20轮", },
  { id: 21, leagueId: 3, homeTeamId: 22, awayTeamId: 21, homeTeamRank: 12, awayTeamRank: 7, score: "3:2", historyH2H1: 3, historyH2H2: 4, historyH2H3: 1, homeForm1: 2, homeForm2: 2, homeForm3: 0, homeForm4: 2, homeForm5: 1, homeForm6: 0, awayForm1: 1, awayForm2: 2, awayForm3: 0, awayForm4: 3, awayForm5: 3, awayForm6: 1, euroInitWin: "4.92", euroInitDraw: "4.34", euroInitLose: "4.39", euroCurWin: "2.33", euroCurDraw: "3.84", euroCurLose: "2.70", asiaInitHomeOdds: "1.05", asiaInitHandicap: "-0.5", asiaInitAwayOdds: "0.96", asiaCurHomeOdds: "1.04", asiaCurHandicap: "-0.5", asiaCurAwayOdds: "0.89", theoryWin: "4.30", theoryDraw: "4.17", theoryLose: "1.15", theoryWater: "0.83", remark: "第21轮", },
  { id: 22, leagueId: 5, homeTeamId: 28, awayTeamId: 29, homeTeamRank: 13, awayTeamRank: 8, score: "4:2", historyH2H1: 4, historyH2H2: 4, historyH2H3: 3, homeForm1: 1, homeForm2: 2, homeForm3: 0, homeForm4: 1, homeForm5: 3, homeForm6: 1, awayForm1: 2, awayForm2: 0, awayForm3: 2, awayForm4: 3, awayForm5: 0, awayForm6: 3, euroInitWin: "2.13", euroInitDraw: "4.20", euroInitLose: "4.09", euroCurWin: "2.68", euroCurDraw: "4.03", euroCurLose: "2.70", asiaInitHomeOdds: "0.83", asiaInitHandicap: "+0.5", asiaInitAwayOdds: "0.98", asiaCurHomeOdds: "0.94", asiaCurHandicap: "0", asiaCurAwayOdds: "0.89", theoryWin: "3.40", theoryDraw: "3.88", theoryLose: "3.33", theoryWater: "0.90", remark: "第22轮", },
  { id: 23, leagueId: 2, homeTeamId: 15, awayTeamId: 14, homeTeamRank: 13, awayTeamRank: 5, score: "1:2", historyH2H1: 3, historyH2H2: 5, historyH2H3: 2, homeForm1: 0, homeForm2: 3, homeForm3: 3, homeForm4: 2, homeForm5: 1, homeForm6: 0, awayForm1: 0, awayForm2: 3, awayForm3: 1, awayForm4: 2, awayForm5: 0, awayForm6: 2, euroInitWin: "2.79", euroInitDraw: "3.88", euroInitLose: "1.38", euroCurWin: "1.88", euroCurDraw: "3.15", euroCurLose: "4.95", asiaInitHomeOdds: "1.04", asiaInitHandicap: "+0.5", asiaInitAwayOdds: "0.96", asiaCurHomeOdds: "0.98", asiaCurHandicap: "-1", asiaCurAwayOdds: "0.85", theoryWin: "3.13", theoryDraw: "3.81", theoryLose: "3.41", theoryWater: "0.89", remark: "第23轮", },
  { id: 24, leagueId: 2, homeTeamId: 13, awayTeamId: 16, homeTeamRank: 8, awayTeamRank: 10, score: "3:3", historyH2H1: 1, historyH2H2: 0, historyH2H3: 1, homeForm1: 2, homeForm2: 1, homeForm3: 1, homeForm4: 1, homeForm5: 0, homeForm6: 3, awayForm1: 0, awayForm2: 2, awayForm3: 0, awayForm4: 2, awayForm5: 2, awayForm6: 2, euroInitWin: "1.35", euroInitDraw: "3.47", euroInitLose: "1.16", euroCurWin: "2.86", euroCurDraw: "4.37", euroCurLose: "1.84", asiaInitHomeOdds: "0.94", asiaInitHandicap: "-0.5", asiaInitAwayOdds: "0.90", asiaCurHomeOdds: "0.82", asiaCurHandicap: "0", asiaCurAwayOdds: "0.87", theoryWin: "2.59", theoryDraw: "3.07", theoryLose: "1.80", theoryWater: "0.95", remark: "第24轮", },
  { id: 25, leagueId: 2, homeTeamId: 14, awayTeamId: 11, homeTeamRank: 19, awayTeamRank: 12, score: "3:4", historyH2H1: 3, historyH2H2: 1, historyH2H3: 2, homeForm1: 0, homeForm2: 2, homeForm3: 3, homeForm4: 2, homeForm5: 1, homeForm6: 0, awayForm1: 1, awayForm2: 0, awayForm3: 3, awayForm4: 0, awayForm5: 0, awayForm6: 2, euroInitWin: "3.27", euroInitDraw: "3.31", euroInitLose: "3.91", euroCurWin: "2.09", euroCurDraw: "3.49", euroCurLose: "3.15", asiaInitHomeOdds: "0.82", asiaInitHandicap: "-1", asiaInitAwayOdds: "0.80", asiaCurHomeOdds: "0.99", asiaCurHandicap: "-0.5", asiaCurAwayOdds: "0.81", theoryWin: "4.85", theoryDraw: "4.00", theoryLose: "3.32", theoryWater: "0.94", remark: "第25轮", },
  { id: 26, leagueId: 3, homeTeamId: 21, awayTeamId: 19, homeTeamRank: 10, awayTeamRank: 10, score: "3:2", historyH2H1: 2, historyH2H2: 3, historyH2H3: 2, homeForm1: 1, homeForm2: 3, homeForm3: 0, homeForm4: 3, homeForm5: 2, homeForm6: 0, awayForm1: 0, awayForm2: 2, awayForm3: 1, awayForm4: 3, awayForm5: 1, awayForm6: 0, euroInitWin: "3.61", euroInitDraw: "3.22", euroInitLose: "2.00", euroCurWin: "4.55", euroCurDraw: "3.43", euroCurLose: "2.09", asiaInitHomeOdds: "1.08", asiaInitHandicap: "-1", asiaInitAwayOdds: "0.81", asiaCurHomeOdds: "0.84", asiaCurHandicap: "+0.5", asiaCurAwayOdds: "0.98", theoryWin: "2.97", theoryDraw: "4.26", theoryLose: "2.06", theoryWater: "0.91", remark: "第26轮", },
  { id: 27, leagueId: 4, homeTeamId: 25, awayTeamId: 24, homeTeamRank: 20, awayTeamRank: 15, score: "1:4", historyH2H1: 4, historyH2H2: 2, historyH2H3: 2, homeForm1: 0, homeForm2: 3, homeForm3: 2, homeForm4: 2, homeForm5: 0, homeForm6: 0, awayForm1: 3, awayForm2: 3, awayForm3: 2, awayForm4: 2, awayForm5: 1, awayForm6: 0, euroInitWin: "1.95", euroInitDraw: "4.14", euroInitLose: "1.32", euroCurWin: "2.18", euroCurDraw: "4.21", euroCurLose: "3.42", asiaInitHomeOdds: "0.99", asiaInitHandicap: "-1", asiaInitAwayOdds: "1.05", asiaCurHomeOdds: "0.95", asiaCurHandicap: "+0.5", asiaCurAwayOdds: "0.90", theoryWin: "4.73", theoryDraw: "4.09", theoryLose: "1.44", theoryWater: "0.94", remark: "第27轮", },
  { id: 28, leagueId: 2, homeTeamId: 11, awayTeamId: 16, homeTeamRank: 8, awayTeamRank: 10, score: "3:1", historyH2H1: 2, historyH2H2: 1, historyH2H3: 1, homeForm1: 3, homeForm2: 2, homeForm3: 1, homeForm4: 0, homeForm5: 2, homeForm6: 1, awayForm1: 1, awayForm2: 3, awayForm3: 0, awayForm4: 0, awayForm5: 1, awayForm6: 3, euroInitWin: "3.56", euroInitDraw: "4.46", euroInitLose: "1.31", euroCurWin: "1.32", euroCurDraw: "4.36", euroCurLose: "4.71", asiaInitHomeOdds: "0.88", asiaInitHandicap: "+1", asiaInitAwayOdds: "0.85", asiaCurHomeOdds: "1.02", asiaCurHandicap: "-0.5", asiaCurAwayOdds: "0.83", theoryWin: "3.97", theoryDraw: "3.97", theoryLose: "3.70", theoryWater: "0.81", remark: "第28轮", },
  { id: 29, leagueId: 4, homeTeamId: 23, awayTeamId: 27, homeTeamRank: 6, awayTeamRank: 11, score: "1:1", historyH2H1: 1, historyH2H2: 3, historyH2H3: 5, homeForm1: 1, homeForm2: 0, homeForm3: 3, homeForm4: 0, homeForm5: 1, homeForm6: 3, awayForm1: 0, awayForm2: 1, awayForm3: 0, awayForm4: 2, awayForm5: 0, awayForm6: 3, euroInitWin: "1.77", euroInitDraw: "4.34", euroInitLose: "1.33", euroCurWin: "1.59", euroCurDraw: "3.76", euroCurLose: "4.62", asiaInitHomeOdds: "0.84", asiaInitHandicap: "+1", asiaInitAwayOdds: "1.08", asiaCurHomeOdds: "0.98", asiaCurHandicap: "-0.5", asiaCurAwayOdds: "0.96", theoryWin: "2.50", theoryDraw: "3.74", theoryLose: "1.62", theoryWater: "0.96", remark: "第29轮", },
  { id: 30, leagueId: 1, homeTeamId: 3, awayTeamId: 2, homeTeamRank: 3, awayTeamRank: 8, score: "2:1", historyH2H1: 2, historyH2H2: 5, historyH2H3: 0, homeForm1: 3, homeForm2: 1, homeForm3: 3, homeForm4: 2, homeForm5: 1, homeForm6: 3, awayForm1: 2, awayForm2: 2, awayForm3: 1, awayForm4: 2, awayForm5: 3, awayForm6: 2, euroInitWin: "2.75", euroInitDraw: "4.26", euroInitLose: "4.24", euroCurWin: "2.99", euroCurDraw: "4.15", euroCurLose: "4.53", asiaInitHomeOdds: "0.98", asiaInitHandicap: "-0.5", asiaInitAwayOdds: "1.07", asiaCurHomeOdds: "0.83", asiaCurHandicap: "-1", asiaCurAwayOdds: "0.84", theoryWin: "5.01", theoryDraw: "3.10", theoryLose: "4.19", theoryWater: "0.98", remark: "第30轮", },
  { id: 31, leagueId: 1, homeTeamId: 2, awayTeamId: 1, homeTeamRank: 7, awayTeamRank: 17, score: "4:0", historyH2H1: 0, historyH2H2: 0, historyH2H3: 0, homeForm1: 3, homeForm2: 1, homeForm3: 0, homeForm4: 0, homeForm5: 2, homeForm6: 3, awayForm1: 1, awayForm2: 3, awayForm3: 3, awayForm4: 3, awayForm5: 2, awayForm6: 0, euroInitWin: "3.58", euroInitDraw: "3.49", euroInitLose: "1.71", euroCurWin: "1.57", euroCurDraw: "3.74", euroCurLose: "4.34", asiaInitHomeOdds: "1.01", asiaInitHandicap: "0", asiaInitAwayOdds: "1.06", asiaCurHomeOdds: "1.01", asiaCurHandicap: "0", asiaCurAwayOdds: "0.99", theoryWin: "2.70", theoryDraw: "4.12", theoryLose: "4.44", theoryWater: "0.85", remark: "第31轮", },
  { id: 32, leagueId: 2, homeTeamId: 11, awayTeamId: 13, homeTeamRank: 1, awayTeamRank: 17, score: "3:1", historyH2H1: 1, historyH2H2: 4, historyH2H3: 0, homeForm1: 1, homeForm2: 0, homeForm3: 2, homeForm4: 3, homeForm5: 1, homeForm6: 2, awayForm1: 2, awayForm2: 1, awayForm3: 0, awayForm4: 1, awayForm5: 1, awayForm6: 1, euroInitWin: "1.67", euroInitDraw: "4.34", euroInitLose: "3.83", euroCurWin: "4.21", euroCurDraw: "3.25", euroCurLose: "4.39", asiaInitHomeOdds: "0.87", asiaInitHandicap: "-1", asiaInitAwayOdds: "0.99", asiaCurHomeOdds: "0.83", asiaCurHandicap: "0", asiaCurAwayOdds: "0.82", theoryWin: "2.23", theoryDraw: "3.26", theoryLose: "2.92", theoryWater: "0.99", remark: "第32轮", },
  { id: 33, leagueId: 4, homeTeamId: 25, awayTeamId: 26, homeTeamRank: 3, awayTeamRank: 16, score: "2:1", historyH2H1: 2, historyH2H2: 1, historyH2H3: 4, homeForm1: 3, homeForm2: 3, homeForm3: 2, homeForm4: 0, homeForm5: 3, homeForm6: 2, awayForm1: 2, awayForm2: 0, awayForm3: 0, awayForm4: 1, awayForm5: 0, awayForm6: 3, euroInitWin: "4.70", euroInitDraw: "3.12", euroInitLose: "3.77", euroCurWin: "4.80", euroCurDraw: "4.47", euroCurLose: "4.60", asiaInitHomeOdds: "1.04", asiaInitHandicap: "+0.5", asiaInitAwayOdds: "0.89", asiaCurHomeOdds: "0.95", asiaCurHandicap: "-0.5", asiaCurAwayOdds: "0.89", theoryWin: "3.16", theoryDraw: "4.45", theoryLose: "4.81", theoryWater: "0.86", remark: "第33轮", },
  { id: 34, leagueId: 2, homeTeamId: 16, awayTeamId: 12, homeTeamRank: 9, awayTeamRank: 16, score: "4:4", historyH2H1: 5, historyH2H2: 1, historyH2H3: 0, homeForm1: 2, homeForm2: 3, homeForm3: 2, homeForm4: 1, homeForm5: 2, homeForm6: 3, awayForm1: 3, awayForm2: 1, awayForm3: 0, awayForm4: 2, awayForm5: 2, awayForm6: 0, euroInitWin: "3.12", euroInitDraw: "3.15", euroInitLose: "2.26", euroCurWin: "2.86", euroCurDraw: "4.37", euroCurLose: "3.85", asiaInitHomeOdds: "1.07", asiaInitHandicap: "+0.5", asiaInitAwayOdds: "0.81", asiaCurHomeOdds: "0.99", asiaCurHandicap: "-0.5", asiaCurAwayOdds: "0.96", theoryWin: "1.13", theoryDraw: "4.19", theoryLose: "2.09", theoryWater: "0.99", remark: "第34轮", },
  { id: 35, leagueId: 5, homeTeamId: 29, awayTeamId: 28, homeTeamRank: 14, awayTeamRank: 15, score: "1:4", historyH2H1: 4, historyH2H2: 5, historyH2H3: 4, homeForm1: 1, homeForm2: 0, homeForm3: 0, homeForm4: 2, homeForm5: 0, homeForm6: 3, awayForm1: 2, awayForm2: 0, awayForm3: 2, awayForm4: 1, awayForm5: 2, awayForm6: 3, euroInitWin: "3.89", euroInitDraw: "4.40", euroInitLose: "3.59", euroCurWin: "4.43", euroCurDraw: "4.28", euroCurLose: "2.12", asiaInitHomeOdds: "0.94", asiaInitHandicap: "+1", asiaInitAwayOdds: "0.85", asiaCurHomeOdds: "1.06", asiaCurHandicap: "+1", asiaCurAwayOdds: "0.93", theoryWin: "1.59", theoryDraw: "4.39", theoryLose: "3.68", theoryWater: "0.86", remark: "第35轮", },
];

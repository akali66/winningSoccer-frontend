import axios from 'axios';

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

const BASE_URL = 'http://localhost:3000'; // Assuming backend runs on 8080, user can change this

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export class DefaultApi {
  /**
   * 获取所有联赛
   */
  public static async baseUrlLeaguesGet(): Promise<League[]> {
    const response = await apiClient.get<League[]>('/leagues');
    return response.data;
  }

  /**
   * 创建联赛
   */
  public static async baseUrlLeaguesPost(body: Partial<League>): Promise<League> {
    const response = await apiClient.post<League>('/leagues', body);
    return response.data;
  }

  /**
   * 获取比赛
   */
  public static async baseUrlMatchesGet(): Promise<Match[]> {
    const response = await apiClient.get<Match[]>('/matches');
    return response.data;
  }

  /**
   * 删除比赛
   */
  public static async baseUrlMatchesIdDelete(id: number | string): Promise<void> {
    await apiClient.delete(`/matches/${id}`);
  }

  /**
   * 获取单条比赛
   */
  public static async baseUrlMatchesIdGet(id: number | string): Promise<Match> {
    const response = await apiClient.get<Match>(`/matches/${id}`);
    return response.data;
  }

  /**
   * 更新比赛
   */
  public static async baseUrlMatchesIdPut(id: number | string, body: Partial<Match>): Promise<Match> {
    const response = await apiClient.put<Match>(`/matches/${id}`, body);
    return response.data;
  }

  /**
   * 创建比赛
   */
  public static async baseUrlMatchesPost(body: Partial<Match>): Promise<Match> {
    const response = await apiClient.post<Match>('/matches', body);
    return response.data;
  }

  /**
   * 获取球队
   */
  public static async baseUrlTeamsGet(): Promise<Team[]> {
    const response = await apiClient.get<Team[]>('/teams');
    return response.data;
  }

  /**
   * 创建球队
   */
  public static async baseUrlTeamsPost(body: Partial<Team>): Promise<Team> {
    const response = await apiClient.post<Team>('/teams', body);
    return response.data;
  }
}

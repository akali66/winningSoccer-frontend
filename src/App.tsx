import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import MainLayout from './layout/MainLayout';
import LeaguesPage from './pages/leagues';
import LeagueDetail from './pages/leagues/detail';
import TeamsPage from './pages/teams';
import TeamDetail from './pages/teams/detail';
import MatchesPage from './pages/matches';
import MatchDetail from './pages/matches/detail';
import MatchEdit from './pages/matches/edit';
import NewMatchPage from './pages/matches/new';
import './App.css';

dayjs.locale('zh-cn');

const App: React.FC = () => {
  return (
    <ConfigProvider locale={zhCN}>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Navigate to="/matches" replace />} />
          <Route path="leagues" element={<LeaguesPage />} />
          <Route path="leagues/:id" element={<LeagueDetail />} />
          <Route path="teams" element={<TeamsPage />} />
          <Route path="teams/:id" element={<TeamDetail />} />
          <Route path="matches" element={<MatchesPage />} />
          <Route path="matches/new" element={<NewMatchPage />} />
          <Route path="matches/:id" element={<MatchDetail />} />
          <Route path="matches/:id/edit" element={<MatchEdit />} />
        </Route>
      </Routes>
    </ConfigProvider>
  );
};

export default App;

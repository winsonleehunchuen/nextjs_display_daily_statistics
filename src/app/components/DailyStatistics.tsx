import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface User {
  UserName: string;
  UserID: string;
}

interface SleepData {
  HRVDate: string;
  Awake: string;
  Light: string;
  Deep: string;
}

interface AnalysisData {
  HRVDate: string;
  VitalzScore: string;
  ScoreType: string;
  StressorIndex: string;
}

interface DailyStatisticsProps {
  user: User;
}

const DailyStatistics: React.FC<DailyStatisticsProps> = ({ user }) => {
  const [sleepData, setSleepData] = useState<SleepData[]>([]);
  const [analysisData, setAnalysisData] = useState<AnalysisData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch sleep data and user analysis data from API
    const fetchData = async () => {
      try {
        const [sleepResponse, analysisResponse] = await Promise.all([
          axios.get<SleepData[]>(`https://exam-vitalz-backend-8267f8929b82.herokuapp.com/api/getUserSleepMarker?userID=${user.UserID}`),
          axios.get<AnalysisData[]>(`https://exam-vitalz-backend-8267f8929b82.herokuapp.com/api/getUserAnalysis?userID=${user.UserID}`)
        ]);
        setSleepData(sleepResponse.data);
        setAnalysisData(analysisResponse.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Error fetching data. Please try again later.');
      }
    };
    fetchData();
  }, [user.UserID]);

  return (
    <div className="card mt-5">
      <div className="card-body">
        <h2 className="card-title text-center">{user.UserName}'s Daily Statistics</h2>
        {loading && <p className="card-text text-center">Loading...</p>}
        {error && <p className="card-text text-center text-danger">{error}</p>}
        {!loading && !error && (
          <>
            <div className="scrollable-table">
              <h3 className="mt-4">Sleep Data</h3>
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Awake</th>
                    <th>Light</th>
                    <th>Deep</th>
                  </tr>
                </thead>
                <tbody>
                  {sleepData.map(stat => (
                    <tr key={stat.HRVDate}>
                      <td>{stat.HRVDate}</td>
                      <td>{stat.Awake}</td>
                      <td>{stat.Light}</td>
                      <td>{stat.Deep}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="scrollable-table">
              <h3 className="mt-4">User Analysis</h3>
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Vitalz Score</th>
                    <th>Score Type</th>
                    <th>Stressor Index</th>
                  </tr>
                </thead>
                <tbody>
                  {analysisData.map(analysis => (
                    <tr key={analysis.HRVDate}>
                      <td>{analysis.HRVDate}</td>
                      <td>{analysis.VitalzScore}</td>
                      <td>{analysis.ScoreType}</td>
                      <td>{analysis.StressorIndex}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default DailyStatistics;

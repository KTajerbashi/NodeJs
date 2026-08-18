import "./Dashboard.css";

function Dashboard() {
  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div>
          <h1>Dashboard</h1>
          <p>Welcome back! Here is your system overview.</p>
        </div>

        <button className="profile-btn">Admin</button>
      </div>

      <div className="stats-grid">
        <div className="glass-card stat-card">
          <span>Total Users</span>
          <h2>12,540</h2>
          <small>+12% this month</small>
        </div>

        <div className="glass-card stat-card">
          <span>Revenue</span>
          <h2>$84,200</h2>
          <small>+8.5% growth</small>
        </div>

        <div className="glass-card stat-card">
          <span>Orders</span>
          <h2>3,240</h2>
          <small>+4.2% today</small>
        </div>

        <div className="glass-card stat-card">
          <span>Active Users</span>
          <h2>892</h2>
          <small>Online now</small>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="glass-card chart-card">
          <h3>Performance Overview</h3>

          <div className="fake-chart">
            <div className="bar bar1"></div>
            <div className="bar bar2"></div>
            <div className="bar bar3"></div>
            <div className="bar bar4"></div>
            <div className="bar bar5"></div>
          </div>
        </div>

        <div className="glass-card activity-card">
          <h3>Recent Activity</h3>

          <ul>
            <li>
              <span></span>
              New user registered
              <time>2 min ago</time>
            </li>

            <li>
              <span></span>
              Order completed
              <time>15 min ago</time>
            </li>

            <li>
              <span></span>
              Payment received
              <time>1 hour ago</time>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

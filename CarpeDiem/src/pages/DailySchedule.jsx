export default function DailySchedule() {
    return (
        <div className="body">
            {/* Build out the 3 main panels - tracking dash, task board, and main schedule */}
            <div className="dashboard">
                <div className="weekly-progress card">
                    <h2>Weekly Progress</h2>
                    <p>Graph goes here</p>
                </div>
                <div className="roadmap-progress card">
                    <h2>Roadmap Progress</h2>
                    <p>Graph goes here</p>
                </div>
                <div className="completion-progress card">
                    <h2>Completion Progress</h2>
                    <p>Graph goes here</p>
                </div>
            </div>
            <div className="schedule-section">
                <div className="template-panel card">
                    <h2>Templates</h2>
                    <div className="template-list">
                        <div className="template-item card">
                            <p>Template Item 1</p>
                        </div>
                        <div className="template-item card">
                            <p>Template Item 2</p>
                        </div>
                        <div className="template-item card">
                            <p>Template Item 3</p>
                        </div>
                    </div>
                </div>
                <div className="schedule card">
                    <h2 className="schedule-title">The Day</h2>
                    <div className="schedule-rows">
                        <div className="schedule-titles schedule-item">
                            <h3>Blocks</h3>
                            <h3>Completed</h3>
                            <h3>Notes</h3>
                        </div>
                        <div className="schedule-item card">
                            <p>Blocks</p>
                            <p>Completed</p>
                            <p>Notes</p>
                        </div>
                        <div className="schedule-item card">
                            <p>Blocks</p>
                            <p>Completed</p>
                            <p>Notes</p>
                        </div>
                        <div className="schedule-item card">
                            <p>Blocks</p>
                            <p>Completed</p>
                            <p>Notes</p>
                        </div>
                        <div className="schedule-item card">
                            <p>Blocks</p>
                            <p>Completed</p>
                            <p>Notes</p>
                        </div>
                        <div className="schedule-item card">
                            <p>Blocks</p>
                            <p>Completed</p>
                            <p>Notes</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
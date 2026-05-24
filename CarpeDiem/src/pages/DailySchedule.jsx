export default function DailySchedule() {
    return (
        <div className="body">
            {/* Build out the 3 main panels - tracking dash, task board, and main schedule */}
            <div className="dashboard">
                <div className="weekly-progress">
                    <h2>Weekly Progress</h2>
                    <p>Graph goes here</p>
                </div>
                <div className="roadmap-progress">
                    <h2>Roadmap Progress</h2>
                    <p>Graph goes here</p>
                </div>
                <div className="completion-progress">
                    <h2>Completion Progress</h2>
                    <p>Graph goes here</p>
                </div>
            </div>
            <div className="schedule-section">
                <div className="template-panel">
                    <h2>Templates</h2>
                    <div className="template-list">
                        <ul>Workout</ul>
                        <ul>Study</ul>
                        <ul>Build house</ul>
                    </div>
                </div>
                <div className="schedule">
                    <h2 className="schedule-title">The Day</h2>
                    <div className="schedule-rows">
                        <div className="template-blocks">
                            <h3>Blocks</h3>
                            <ul>Item 1</ul>
                            <ul>Item 2</ul>
                            <ul>Item 3</ul>
                            <ul>Item 4</ul>
                            <ul>Item 5</ul>
                        </div>
                        <div className="block-completed">
                            <h3>Completed</h3>
                            <ul>Item 1</ul>
                            <ul>Item 2</ul>
                            <ul>Item 3</ul>
                            <ul>Item 4</ul>
                            <ul>Item 5</ul>
                        </div>
                        <div className="block-notes">
                            <h3>Notes</h3>
                            <ul>Item 1</ul>
                            <ul>Item 2</ul>
                            <ul>Item 3</ul>
                            <ul>Item 4</ul>
                            <ul>Item 5</ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
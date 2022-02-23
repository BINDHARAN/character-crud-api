import React from 'react';

export function NotFound() {
    return (
        <div>
            <h1 className="not-found " style={{ textAlign: "center" }}>404</h1>

            {/* <img src="https://www.teahub.io/photos/full/362-3620408_404-pacman.jpg" alt="404 error" /> */}
            <img className="error-img" src="https://www.teahub.io/photos/full/362-3620408_404-pacman.jpg" alt="404 error" />

        </div>
    );
}
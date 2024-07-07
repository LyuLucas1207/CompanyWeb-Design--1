const fs = require('fs');
const path = require('path');

const dataFilePath = path.join(__dirname, '..', 'data', 'section26', 'section26.json');

function incrementView_section26(articleIndex, callback) {
    fs.readFile(dataFilePath, 'utf8', (err, data) => {
        if (err) {
            return callback(err);
        }

        try {
            const newsData = JSON.parse(data);
            if (articleIndex >= 0 && articleIndex < newsData.length) {
                newsData[articleIndex].views++;

                fs.writeFile(dataFilePath, JSON.stringify(newsData, null, 2), (err) => {
                    if (err) {
                        return callback(err);
                    }
                    callback(null, { message: 'View incremented successfully' });
                });
            } else {
                callback(new Error('Article not found'));
            }
        } catch (error) {
            callback(error);
        }
    });
}

module.exports = {
    incrementView_section26
};

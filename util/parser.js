function partserError(err) {
    if (err.name == 'ValidationError') {
        return Object.values(err.errors).map(e => e.message);
    } else if (Array.isArray(err)) {
        return err.map(e => e.msg);
    } else {
        return err.message.split('\n');
    }
}

module.exports = {
    partserError,
}
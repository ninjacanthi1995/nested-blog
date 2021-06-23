console.log($(".comment-button"));

$(".comment-button").on("click", function () {
    if ($(this).parent().parent().parent().children().last().prop("tagName") !== "FORM") {
        $(this).parent().parent().parent().append(`
            <form class="form-inline" action="/add-comment" method="POST">
                <div class="form-group mx-sm-3 mb-2" style="flex-grow: 1;">
                    <input type="text" name="description" class="form-control w-100" placeholder="Comment..." required>
                </div>
                <div class="form-group mx-sm-3 mb-2">
                    <input type="text" name="author" class="form-control" placeholder="Enter your name..." required>
                </div>
                <input type="hidden" name="datePublication" value=${Date.now()}>
                <input type="hidden" name="postId" value=${$(this)[0].dataset.postid}>
                <button type="submit" class="btn btn-primary mb-2">Comment</button>
            </form>
        `);
    } else {
        $(this).parent().parent().parent().children("form").remove();
    }
});

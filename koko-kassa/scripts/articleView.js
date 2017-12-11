'use strict';

let articleView = {};

articleView.populateFilters = () => {
  $('article').each(function() {
    if (!$(this).hasClass('template')) {
      let val = $(this).find('address a').text();
      let optionTag = `<option value="${val}">${val}</option>`;

      if ($(`#author-filter option[value="${val}"]`).length === 0) {
        $('#author-filter').append(optionTag);
      }

      val = $(this).attr('data-category');
      optionTag = `<option value="${val}">${val}</option>`;
      if ($(`#category-filter option[value="${val}"]`).length === 0) {
        $('#category-filter').append(optionTag);
      }
    }
  });
};

articleView.handleAuthorFilter = () => {
  $('#author-filter').on('change', function() {
    if ($(this).val()) {
      $('article').hide();
      $(`article[data-author="${$(this).val()}"]`).fadeIn();
    } else {
      $('article').fadeIn();
      $('article.template').hide();
    }
    $('#category-filter').val('');
  });
};

articleView.handleCategoryFilter = () => {
  $('#category-filter').on('change', function() {
    if ($(this).val()) {
      $('article').hide();
      $(`article[data-category="${$(this).val()}"]`).fadeIn();
    } else {
      $('article').fadeIn();
      $('article.template').hide();
    }
    $('#author-filter').val('');
  });
};

articleView.handleMainNav = () => {
  $('.main-nav').on('click', '.tab', function() {
    $('.tab-content').hide();
    $(`#${$(this).data('content')}`).fadeIn();
  });

  $('.main-nav .tab:first').click();
};

articleView.setTeasers = () => {
  $('.article-body *:nth-of-type(n+2)').hide();
  $('article').on('click', 'a.read-on', function(e) {
    e.preventDefault();
    if ($(this).text() === 'Read on →') {
      $(this).parent().find('*').fadeIn();
      $(this).html('Show Less &larr;');
    } else {
      $('body').animate({
        scrollTop: ($(this).parent().offset().top)
      },200);
      $(this).html('Read on &rarr;');
      $(this).parent().find('.article-body *:nth-of-type(n+2)').hide();
    }
  });
};

// COMMENT: Where is this function called? Why?
// PUT YOUR RESPONSE HERE
articleView.initNewArticlePage = () => {
  // TODO: Ensure the main .tab-content area is revealed. We might add more tabs later or otherwise edit the tab navigation.
  $('.tab-content').show();

  // TODO: The new articles we create will be copy/pasted into our source data file.
  // Set up this "export" functionality. We can hide it for now, and show it once we have data to export.
  $('#article-export').hide();
  $('#article-json').on('focus', function(){
    this.select();
  });

  // TODO: Add an event handler to update the preview and the export field if any inputs change.
  $('article-form').on('change', 'inout','textarea', articleView.create)
};

articleView.create = () => {
  let article
  // TODO: Set up a variable to hold the new article we are creating.
  // Clear out the #articles element, so we can put in the updated preview
  $('#articles').empty();


  // TODO: Instantiate an article based on what's in the form fields:
  article = new Article ({
    author: $('#article-author').val(),
    authorUrl: $('#article-url').val(),
    title: $('#article-title').val(),
    category: $('#article-category').val(),
    body: $('#article-body').val(),
    publishedOn: $('#article-pubdate:checked').length ? new Date() : null,
  })

  // TODO: Use our interface to the Handblebars template to put this new article into the DOM:
  $('#articles').append(article.html)

  // TODO: Activate the highlighting of any code blocks; look at the documentation for hljs to see how to do this by placing a callback function in the .each():
  $('pre code').each((i, block) => hljs.highlightBlock(block));

  // TODO: Show our export field, and export the new article as JSON, so it's ready to copy/paste into blogArticles.js:
  $('#article-export').show().find('#article-json').val(JSON.stringify(article));
};

// COMMENT: Where is this function called? Why?
// PUT YOUR RESPONSE HERE
// on the index page. We're using multipl 
articleView.initIndexPage = () => {
  articleView.populateFilters();
  articleView.handleCategoryFilter();
  articleView.handleAuthorFilter();
  articleView.handleMainNav();
  articleView.setTeasers();
};
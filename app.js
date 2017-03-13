$(document).ready(()=>{
  $('#pokeButton').click(()=>{
    const id = $('#pokeId').val();
    getPokemonInfo(id);
  });

  $('#post-wall-e').click(()=>{
    const wallE = {
      name : 'Wall-e-e-e',
      occupation: 'Robot',
      weapon: 'Laser'
    };
    postCharacter(wallE);
  });

  $('#character-form').submit((event)=>{
    event.preventDefault();

    const characterInfo = {
      name: $('#the-name-input').val(),
      occupation: $('#the-occupation-input').val(),
      weapon: $('#the-weapon-input').val(),
    };

    postCharacter(characterInfo);
  });

  $('#update-form').submit((event)=>{
    event.preventDefault();
    const charId = $('#character-id-input').val();
    const updateInfo = {
      name: $('#update-name-input').val(),
      occupation: $('#update-occupation-input').val(),
      weapon: $('#update-weapon-input').val(),
    };
    updateCharacter(charId, updateInfo);
  });
});

function updateCharacter(id, data){
  $.ajax({
    url: `https://ih-api.herokuapp.com/characters/${id}`,
    method: 'PUT',
    data: data,
    success: (result)=>{
      $('#update-form').trigger('reset');
      $('#feedback').html(`${result.name} (id = ${result._id}) was updated successfully`);
      console.log(result);
    },
    error: (err)=>{
      console.log(err);
    }
  });
}

function postCharacter(charInfo){
  $.ajax({
    url: 'https://ih-api.herokuapp.com/characters/',
    method: 'POST',
    data: charInfo,
    success: (data)=>{
      console.log(data);
      $('#character-form').trigger('reset');
      $('#feedback').html(`${result.name} (id = ${result.id}) was created`);

    },
    error: (err)=>{
      console.log(err);
    }
  });
}

function getPokemonInfo(id){
  $.ajax({
    url: `http://pokeapi.co/api/v2/pokemon/${id}`,
    method: 'GET',
    success: (data)=>{
      console.log(data);
      $('#pokeInfo').html(`
        <h2>${data.name}</h2>
        <img src='${data.sprites.front_default}'>
        <img src='${data.sprites.back_default}'>
        `);
    },
    error: (err)=>{
      console.log(err);
    }
  });
}

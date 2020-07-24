import qs from 'qs'

export function startMerge(merge_file) {
    if (merge_file == null) {
        console.log('no complete file')
        return
    }

    const myData = qs.stringify({img: merge_file})
    const URL = '/codes/2020/txfg/index3.php'
    return fetch(URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: myData,
    }).then((response) => response.json())
}

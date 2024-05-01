import os
from django.core.files.storage import Storage
import json


class JSONstorage(Storage):
    def __init__(self, location):
        self.location = location

    def _open(self, name, mode='rb'):
        return open(self.path(name), mode)

    def _save(self, name, content):
        with self._open(name, 'wb') as destination:
            for chunk in content.chunks():
                destination.write(chunk)

    def delete(self, name):
        pass

    def path(self, name):
        return os.path.join(self.location, name)

    def exists(self, name):
        return os.path.exists(self.path(name))

    def url(self, name):
        return ''

    def size(self, name):
        return os.path.getsize(self.path(name))

    def read_json(self, name):
        with self._open(name) as f:
            return json.load(f)

    def write_json(self, name, data):
        with self._open(name, 'w') as f:
            json.dump(data, f, indent=4)
